package networkmanager

import (
	"net"
	"encoding/binary"

	"github.com/Wifx/gonetworkmanager"
	"github.com/godbus/dbus/v5"
)

type NetworkManager struct {
	networkManager	*gonetworkmanager.NetworkManager
	deviceWireless *gonetworkmanager.DeviceWireless
}

type ipv4Address struct {
	address string
	prefix uint32
}

const (
	DBUS_SIGNAL_INTERFACE_MATCH	=	"org.freedesktop.DBus.Properties"
	DBUS_SIGNAL_MATCH 				=	"PropertiesChanged"
	DBUS_LASTSCAN_PROPERTY_NAME	=	"LastScan"
	ACCESS_POINT_NAME					=	"wiman-ap"
	ACCESS_POINT_PASSWORD			=	"admin123"
	ACCESS_POINT_GATEWAY_ADDRESS	= 	"192.168.42.1"
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
func inet_aton(ip string) (uint32) {
	return binary.LittleEndian.Uint32(net.ParseIP(ip).To4())
}

// TODO: rename
func waitLastScan(device gonetworkmanager.DeviceWireless, path dbus.ObjectPath) ([]string,error){

	dconn,err := dbus.SystemBus()
	if err != nil {
		return nil,err
	}

	channel := make(chan *dbus.Signal, 1)
	dconn.Signal(channel)

	err = dconn.AddMatchSignal(
		dbus.WithMatchInterface(DBUS_SIGNAL_INTERFACE_MATCH),
		dbus.WithMatchMember(DBUS_SIGNAL_MATCH),
		dbus.WithMatchObjectPath(path),
	)

	if err != nil {
		return nil,err
	}

	for sig := range channel {

		propertiesChanged := sig.Body[1].(map[string]dbus.Variant)
		
		for propName,_ := range propertiesChanged {
			if propName == DBUS_LASTSCAN_PROPERTY_NAME {
				accessPointsRaw, err := device.GetAccessPoints()
				if err != nil {
					return nil,err
				}

				ssids := []string{}
				for _, accessPoint := range accessPointsRaw {
					ssid, err := accessPoint.GetPropertySSID()
					if err != nil {
						return nil,err
					}
					
					if !stringInSlice(ssid,ssids) {
						ssids = append(ssids,ssid)
					}
				}
				return ssids,nil			
			}
		}
	}
	return nil,err
}

// NewNetworkManager :
func NewNetworkManager() (*NetworkManager, error) {

	/* Create new instance of gonetworkmanager */
	nm, err := gonetworkmanager.NewNetworkManager()
	if err != nil {
		return nil, err
	}

	/* Get devices */
	devices, err := nm.GetPropertyAllDevices()
	if err != nil {
		return nil, err
	}
	
	/* Get first wireless device */
	for _, device := range devices {

		deviceType, err := device.GetPropertyDeviceType()
		if err != nil {
			return nil, err
		}

		if (deviceType == gonetworkmanager.NmDeviceTypeWifi) {
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

// GetSSIDs :
func (n *NetworkManager) GetSSIDs() ([]string, error) {
		err := (*n.deviceWireless).RequestScan()
		if err != nil {
			return nil, err
		}

		return waitLastScan(*n.deviceWireless, (*n.deviceWireless).GetPath())
}

// StartAccessPoint :
func (n *NetworkManager) StartAccessPoint() (error) {

	conn := gonetworkmanager.ConnectionSettings{}
			
	conn["connection"] = make(map[string]interface{})
	conn["connection"]["id"] = ACCESS_POINT_NAME
	conn["connection"]["type"] = "802-11-wireless"	
	conn["connection"]["autoconnect"] = false

	conn["802-11-wireless"] = make(map[string]interface{})
	conn["802-11-wireless"]["mode"] = "ap"
	conn["802-11-wireless"]["ssid"] = []byte(ACCESS_POINT_NAME)
	conn["802-11-wireless"]["security"] = "802-11-wireless-security"

	conn["802-11-wireless-security"] = make(map[string]interface{})
	conn["802-11-wireless-security"]["key-mgmt"] = "wpa-psk"
	conn["802-11-wireless-security"]["psk"] = ACCESS_POINT_PASSWORD
 
	addressData := []uint32{inet_aton(ACCESS_POINT_GATEWAY_ADDRESS),uint32(24),inet_aton(ACCESS_POINT_GATEWAY_ADDRESS)}
	addresses := [][]uint32{addressData}
	
	conn["ipv4"] = make(map[string]interface{})
	conn["ipv4"]["addresses"] = addresses
	conn["ipv4"]["method"] = "manual"

	conn["ipv6"] = make(map[string]interface{})
	conn["ipv6"]["method"] = "ignore"

	conn["proxy"] = make(map[string]interface{})

	_,err := (*n.networkManager).AddAndActivateConnection(conn, (*n.deviceWireless))
	if err != nil {
		return err
	}
	return nil
}

// StoptAccessPoint :
func (n *NetworkManager) StoptAccessPoint() (error) {
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