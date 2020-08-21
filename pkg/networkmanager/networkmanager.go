package networkmanager

import (
	"encoding/binary"
	"errors"
	"net"
	"time"

	"github.com/Wifx/gonetworkmanager"
	"github.com/godbus/dbus/v5"
)

// NetworkManager :
type NetworkManager struct {
	networkManager *gonetworkmanager.NetworkManager
	deviceWireless *gonetworkmanager.DeviceWireless
}

// AccessPoint :
type AccessPoint struct {
	SSID string
	RSSI int
}

// Connection :
type Connection struct {
	SSID     string
	Password string
}

// Hotspot :
type Hotspot struct {
	Enabled        bool
	SSID           string
	Mode           string
	Password       string
	GatewayAddress string
}

const (
	defaultTimeout                     = 10
	dbusSignalInterfaceMatchingPattern = "org.freedesktop.DBus.Properties"
	dbusSignalMemberMatchingPattern    = "PropertiesChanged"
)

// TODO: move
func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

func inetAton(ip string) uint32 {
	return binary.LittleEndian.Uint32(net.ParseIP(ip).To4())
}

func waitLastScan(device gonetworkmanager.DeviceWireless, path dbus.ObjectPath, timeout int) ([]*AccessPoint, error) {

	if timeout == 0 {
		timeout = defaultTimeout
	}

	dconn, err := dbus.SystemBus()
	if err != nil {
		return nil, err
	}

	channel := make(chan *dbus.Signal, 1)
	dconn.Signal(channel)

	err = dconn.AddMatchSignal(
		dbus.WithMatchInterface(dbusSignalInterfaceMatchingPattern),
		dbus.WithMatchMember(dbusSignalMemberMatchingPattern),
		dbus.WithMatchObjectPath(path),
	)

	if err != nil {
		return nil, err
	}

	for {
		select {
		case <-time.After(time.Duration(timeout) * time.Second):
			return nil, errors.New("reached timeout while waiting for signal")
		case sig := <-channel:

			changedProps := sig.Body[1].(map[string]dbus.Variant)

			for key := range changedProps {
				if key == "AccessPoints" || key == "LastScan" {

					aps, err := device.GetAccessPoints()
					if err != nil {
						return nil, err
					}

					accessPoints := []*AccessPoint{}
					//TODO: remove duplicates
					for _, ap := range aps {

						ssid, err := ap.GetPropertySSID()
						if err != nil {
							return nil, err
						}

						rssi, err := ap.GetPropertyStrength()
						if err != nil {
							return nil, err
						}

						accessPoints = append(accessPoints, &AccessPoint{SSID: ssid, RSSI: int(rssi)})
					}
					return accessPoints, nil
				}
			}
		}
	}
}

func waitACtiveConnection(device gonetworkmanager.DeviceWireless, path dbus.ObjectPath, timeout int) error {

	if timeout == 0 {
		timeout = defaultTimeout
	}

	dconn, err := dbus.SystemBus()
	if err != nil {
		return err
	}

	channel := make(chan *dbus.Signal, 1)
	dconn.Signal(channel)

	err = dconn.AddMatchSignal(
		dbus.WithMatchInterface(dbusSignalInterfaceMatchingPattern),
		dbus.WithMatchMember(dbusSignalMemberMatchingPattern),
		dbus.WithMatchObjectPath(path),
	)

	if err != nil {
		return err
	}

	for {
		select {
		case <-time.After(time.Duration(timeout) * time.Second):
			return errors.New("reached timeout while waiting for signal")
		case sig := <-channel:

			changedProps := sig.Body[1].(map[string]dbus.Variant)

			for key := range changedProps {
				if key == "ActiveAccessPoint" {
					return nil
				}
			}
		}
	}
}

// NewNetworkManager :
func NewNetworkManager() (*NetworkManager, error) {

	nm, err := gonetworkmanager.NewNetworkManager()
	if err != nil {
		return nil, err
	}

	devices, err := nm.GetPropertyAllDevices()
	if err != nil {
		return nil, err
	}

	for _, device := range devices {

		deviceType, err := device.GetPropertyDeviceType()
		if err != nil {
			return nil, err
		}

		if deviceType == gonetworkmanager.NmDeviceTypeWifi {
			dw, err := gonetworkmanager.NewDeviceWireless(device.GetPath())
			if err != nil {
				return nil, err
			}

			return &NetworkManager{
				networkManager: &nm,
				deviceWireless: &dw,
			}, nil
		}
	}
	return nil, err
}

// StartHotspot :
func (n *NetworkManager) StartHotspot(h *Hotspot) error {

	s := gonetworkmanager.ConnectionSettings{}

	s["connection"] = make(map[string]interface{})
	s["connection"]["id"] = h.SSID
	s["connection"]["type"] = "802-11-wireless"
	s["connection"]["autoconnect"] = false

	s["802-11-wireless"] = make(map[string]interface{})
	s["802-11-wireless"]["mode"] = h.Mode
	s["802-11-wireless"]["ssid"] = []byte(h.SSID)

	if h.Password != "" {
		s["802-11-wireless"]["security"] = "802-11-wireless-security"
		s["802-11-wireless-security"] = make(map[string]interface{})
		s["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
		s["802-11-wireless-security"]["psk"] = h.Password
	}

	addressData := []uint32{inetAton(h.GatewayAddress), uint32(24), inetAton(h.GatewayAddress)}
	addresses := [][]uint32{addressData}

	s["ipv4"] = make(map[string]interface{})
	s["ipv4"]["addresses"] = addresses
	s["ipv4"]["method"] = "shared"

	s["ipv6"] = make(map[string]interface{})
	s["ipv6"]["method"] = "ignore"

	s["proxy"] = make(map[string]interface{})

	nms, err := gonetworkmanager.NewSettings()
	if err != nil {
		return err
	}

	conn, err := nms.AddConnectionUnsaved(s)
	if err != nil {
		return err
	}

	_, err = (*n.networkManager).ActivateConnection(conn, (*n.deviceWireless))
	if err != nil {
		return err
	}

	return waitACtiveConnection(*n.deviceWireless, (*n.deviceWireless).GetPath(), 10)
}

// StopHotspot :
func (n *NetworkManager) StopHotspot(ssid string) error {
	//TODO
	return nil
}

// GetAccessPoints :
func (n *NetworkManager) GetAccessPoints() ([]*AccessPoint, error) {
	err := (*n.deviceWireless).RequestScan()
	if err != nil {
		return nil, err
	}
	return waitLastScan(*n.deviceWireless, (*n.deviceWireless).GetPath(), 10)
}

// UpsertConnection :
func (n *NetworkManager) UpsertConnection(c *Connection) error {

	if err := n.removeConnectionByName(c.SSID); err != nil {
		return err
	}

	if err := n.insertConnection(c); err != nil {
		return err
	}

	return nil
}

func (n *NetworkManager) insertConnection(c *Connection) error {
	s := gonetworkmanager.ConnectionSettings{}

	s["connection"] = make(map[string]interface{})
	s["connection"]["id"] = c.SSID
	s["connection"]["type"] = "802-11-wireless"

	s["802-11-wireless"] = make(map[string]interface{})
	s["802-11-wireless"]["mode"] = "infrastructure"
	s["802-11-wireless"]["ssid"] = []byte(c.SSID)

	if c.Password != "" {
		s["802-11-wireless"]["security"] = "802-11-wireless-security"
		s["802-11-wireless-security"] = make(map[string]interface{})
		s["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
		s["802-11-wireless-security"]["psk"] = c.Password
	}

	s["ipv4"] = make(map[string]interface{})
	s["ipv4"]["method"] = "auto"

	s["ipv6"] = make(map[string]interface{})
	s["ipv6"]["method"] = "auto"

	s["proxy"] = make(map[string]interface{})

	nms, err := gonetworkmanager.NewSettings()
	if err != nil {
		return err
	}

	_, err = nms.AddConnection(s)
	if err != nil {
		return err
	}

	return nil
}

// removeConnectionByName :
func (n *NetworkManager) removeConnectionByName(ssid string) error {
	conns, err := n.getSavedConnections()
	if err != nil {
		return err
	}

	for _, conn := range conns {
		s, err := conn.GetSettings()
		if err != nil {
			return err
		}

		if s["connection"]["id"] == "c.SSID" {
			return conn.Delete()
		}
	}
	return nil
}

func (n *NetworkManager) getSavedConnections() ([]gonetworkmanager.Connection, error) {
	nms, err := gonetworkmanager.NewSettings()
	if err != nil {
		return nil, err
	}

	conns, err := nms.ListConnections()
	if err != nil {
		return nil, err
	}

	return conns, nil

}
