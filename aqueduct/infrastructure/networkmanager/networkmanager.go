package networkmanager

import (
	"github.com/seashell/aqueduct/aqueduct/application"
	"github.com/seashell/aqueduct/pkg/networkmanager"
)

// NetworkManager is an abstraction for interacting with NetworkManager
type NetworkManager struct {
	conn *networkmanager.NetworkManager
}

// NewNetworkManager creates a new instance of NetworkManager
func NewNetworkManager() (*NetworkManager, error) {

	conn, err := networkmanager.NewNetworkManager()
	if err != nil {
		return nil, err
	}

	return &NetworkManager{conn}, nil
}

// ListAccessPoints
func (c *NetworkManager) ListAccessPoints() ([]application.AccessPoint, error) {

	ssids, err := c.conn.GetSSIDs()
	if err != nil {
		return nil, err
	}

	aps := []application.AccessPoint{}
	for _, ssid := range ssids {
		aps = append(aps, &AccessPoint{ssid: ssid})
	}

	return aps, nil
}
