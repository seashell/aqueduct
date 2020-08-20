package networkmanager

import (
	"encoding/binary"
	"errors"
	"net"
	"time"

	"github.com/Wifx/gonetworkmanager"
	"github.com/godbus/dbus/v5"
)

type NetworkManager struct {
	networkManager *gonetworkmanager.NetworkManager
	deviceWireless *gonetworkmanager.DeviceWireless
}

type AccessPoint struct {
	SSID string
	RSSI int
}

type Connection struct {
	SSID string
	Password string
}

type Hotspot struct {
	Enabled 	bool
	SSID		string
	Mode		string
	Password string
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

// TODO: rename
func inet_aton(ip string) uint32 {
	return binary.LittleEndian.Uint32(net.ParseIP(ip).To4())
}

// waitLastScan
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

			for key, _ := range changedProps {
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

// waitACtiveConnection
func waitACtiveConnection(device gonetworkmanager.DeviceWireless, path dbus.ObjectPath, timeout int) (error) {

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

			for key, _ := range changedProps {
				if key == "ActiveAccessPoint" {
					return nil
				}
			}
		}
	}
}

// NewNetworkManager
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

// GetAccessPoints
func (n *NetworkManager) GetAccessPoints() ([]*AccessPoint, error) {
	err := (*n.deviceWireless).RequestScan()
	if err != nil {
		return nil, err
	}
	return waitLastScan(*n.deviceWireless, (*n.deviceWireless).GetPath(), 10)
}

// AddConnection
func (n *NetworkManager) AddConnection(c *Connection) (error) {
	conn := gonetworkmanager.ConnectionSettings{}

	conn["connection"] = make(map[string]interface{})
	conn["connection"]["id"] = c.SSID
	conn["connection"]["type"] = "802-11-wireless"

	conn["802-11-wireless"] = make(map[string]interface{})
	conn["802-11-wireless"]["mode"] = "infrastructure"
	conn["802-11-wireless"]["ssid"] = []byte(c.SSID)


	if c.Password != "" {
		conn["802-11-wireless"]["security"] = "802-11-wireless-security"
		conn["802-11-wireless-security"] = make(map[string]interface{})
		conn["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
		conn["802-11-wireless-security"]["psk"] = c.Password
	}

	conn["ipv4"] = make(map[string]interface{})
	conn["ipv4"]["method"] = "auto"

	conn["ipv6"] = make(map[string]interface{})
	conn["ipv6"]["method"] = "auto"

	conn["proxy"] = make(map[string]interface{})

	nms, err := gonetworkmanager.NewSettings()
	if err != nil {
		return err
	}

	_, err =	nms.AddConnection(conn)
	if err != nil {
		return err
	}

	return nil
}

// RemoveConnection
func (n *NetworkManager) RemoveConnection(ssid string) (error) {
	nms, err := gonetworkmanager.NewSettings()

	connections,err := nms.ListConnections() 
	if err != nil {
		return err
	}

	for _,conn := range connections {

		settings,err := conn.GetSettings()
		if err != nil {
			return err
		}

		if settings["connection"]["id"] == ssid {
			err = conn.Delete()
			if err != nil {
				return err
			}
		}
	}

	return nil
}

// StartHotspot
func (n *NetworkManager) StartHotspot(h *Hotspot) error {

	conn := gonetworkmanager.ConnectionSettings{}

	conn["connection"] = make(map[string]interface{})
	conn["connection"]["id"] = h.SSID
	conn["connection"]["type"] = "802-11-wireless"
	conn["connection"]["autoconnect"] = false

	conn["802-11-wireless"] = make(map[string]interface{})
	conn["802-11-wireless"]["mode"] = h.Mode
	conn["802-11-wireless"]["ssid"] = []byte(h.SSID)


	if h.Password != "" {
		conn["802-11-wireless"]["security"] = "802-11-wireless-security"
		conn["802-11-wireless-security"] = make(map[string]interface{})
		conn["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
		conn["802-11-wireless-security"]["psk"] = h.Password
	}


	addressData := []uint32{inet_aton(h.GatewayAddress), uint32(24), inet_aton(h.GatewayAddress)}
	addresses := [][]uint32{addressData}

	conn["ipv4"] = make(map[string]interface{})
	conn["ipv4"]["addresses"] = addresses
	conn["ipv4"]["method"] = "shared"

	conn["ipv6"] = make(map[string]interface{})
	conn["ipv6"]["method"] = "ignore"

	conn["proxy"] = make(map[string]interface{})

	_, err := (*n.networkManager).AddAndActivateConnection(conn, (*n.deviceWireless))
	if err != nil {
		return err
	}

	return waitACtiveConnection(*n.deviceWireless, (*n.deviceWireless).GetPath(), 10)
}

// StopHotSpot
func (n *NetworkManager) StopHotspot(ssid string) error {
	
	err := n.RemoveConnection(ssid)
	if err != nil {
		return err
	}
	
	return nil
}