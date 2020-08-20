package networkmanager

import (
	"github.com/seashell/aqueduct/aqueduct/application"
	"github.com/seashell/aqueduct/pkg/networkmanager"
)

// NetworkManager is an abstraction for interacting with NetworkManager
type NetworkManager struct {
	conn *networkmanager.NetworkManager

	cache *Cache
}

type Hotspot struct {
	Enabled 	bool
	SSID 		string
	Mode		string
	Password string
	GatewayAddress string
}


// NewNetworkManager creates a new instance of NetworkManager
func NewNetworkManager() (*NetworkManager, error) {

	conn, err := networkmanager.NewNetworkManager()
	if err != nil {
		return nil, err
	}

	cache := NewCache()

	return &NetworkManager{conn,cache}, nil
}

// ListAccessPoints
func (c *NetworkManager) ListAccessPoints() ([]application.AccessPoint, error) {

	aps, err := c.conn.GetAccessPoints()
	if err != nil {
		return c.cache.Get(), nil
	}

	items := []application.AccessPoint{}
	for _, ap := range aps {
		items = append(items, &AccessPoint{ssid: ap.SSID, rssi: ap.RSSI})
	}

	err = c.cache.Update(items)
	if err != nil {
		return nil, err
	}

	return items, nil
}

// AddConnection
func (c *NetworkManager) AddConnection(conn *networkmanager.Connection) (error) {
	return  c.conn.AddConnection(conn)
}

// PopulateCache
func (c *NetworkManager) PopulateCache() (error) {
	aps, err := c.conn.GetAccessPoints()
	if err != nil {
		return err
	}

	items := []application.AccessPoint{}
	for _, ap := range aps {
		items = append(items, &AccessPoint{ssid: ap.SSID, rssi: ap.RSSI})
	}

	err = c.cache.Update(items)
	if err != nil {
		return err
	}

	return nil
}

// StartHotspot
func (c *NetworkManager) StartHotspot(h *Hotspot) (error) {
	err := c.conn.StartHotspot(&networkmanager.Hotspot{
		SSID: h.SSID,
		Mode: h.Mode,
		Password: h.Password,
		GatewayAddress: h.GatewayAddress,			
	})
	if err != nil {
		return err
	}
	return nil
}

// StartHotspot
func (c *NetworkManager) StopHotspot(ssid string) (error) {
	return  c.conn.StopHotspot(ssid)
}