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

type ipv4Address struct {
	address string
	prefix  uint32
}

const (
	defaultTimeout                     = 10
	dbusSignalInterfaceMatchingPattern = "org.freedesktop.DBus.Properties"
	dbusSignalMemberMatchingPattern    = "PropertiesChanged"
	accessPointSSID                    = "aqueduct-ap"
	accessPointPassword                = "admin123"
	accessPointGatewayAddress          = "192.168.42.1"
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

// TODO: rename
func waitLastScan(device gonetworkmanager.DeviceWireless, path dbus.ObjectPath, timeout int) ([]string, error) {

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

					ssids := []string{}
					for _, ap := range aps {
						ssid, err := ap.GetPropertySSID()
						if err != nil {
							return nil, err
						}
						ssids = append(ssids, ssid)
					}
					return ssids, nil
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

// GetAccessPoints :
func (n *NetworkManager) GetAccessPoints() ([]string, error) {
	err := (*n.deviceWireless).RequestScan()
	if err != nil {
		return nil, err
	}
	return waitLastScan(*n.deviceWireless, (*n.deviceWireless).GetPath(), 10)
}

// StartAccessPoint :
func (n *NetworkManager) StartAccessPoint() error {

	conn := gonetworkmanager.ConnectionSettings{}

	conn["connection"] = make(map[string]interface{})
	conn["connection"]["id"] = accessPointSSID
	conn["connection"]["type"] = "802-11-wireless"
	conn["connection"]["autoconnect"] = false

	conn["802-11-wireless"] = make(map[string]interface{})
	conn["802-11-wireless"]["mode"] = "ap"
	conn["802-11-wireless"]["ssid"] = []byte(accessPointSSID)
	conn["802-11-wireless"]["security"] = "802-11-wireless-security"

	conn["802-11-wireless-security"] = make(map[string]interface{})
	conn["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
	conn["802-11-wireless-security"]["psk"] = accessPointPassword

	addressData := []uint32{inet_aton(accessPointGatewayAddress), uint32(24), inet_aton(accessPointGatewayAddress)}
	addresses := [][]uint32{addressData}

	conn["ipv4"] = make(map[string]interface{})
	conn["ipv4"]["addresses"] = addresses
	conn["ipv4"]["method"] = "manual"

	conn["ipv6"] = make(map[string]interface{})
	conn["ipv6"]["method"] = "ignore"

	conn["proxy"] = make(map[string]interface{})

	_, err := (*n.networkManager).AddAndActivateConnection(conn, (*n.deviceWireless))
	if err != nil {
		return err
	}
	return nil
}

// StoptAccessPoint :
func (n *NetworkManager) StopAccessPoint() error {
	activeConn, err := (*n.deviceWireless).GetPropertyActiveConnection()
	if err != nil {
		return err
	}

	err = (*n.networkManager).DeactivateConnection(activeConn)
	if err != nil {
		return err
	}

	conn, err := activeConn.GetPropertyConnection()
	if err != nil {
		return err
	}

	err = conn.Delete()
	if err != nil {
		return err
	}

	return nil
}
