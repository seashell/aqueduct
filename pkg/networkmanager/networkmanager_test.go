package networkmanager

import (
	"encoding/json"
	"fmt"
	"testing"
)

func PrettyPrint(v interface{}) (err error) {
	b, err := json.MarshalIndent(v, "", "  ")
	if err == nil {
		fmt.Println(string(b))
	}
	return
}

func TestListWifiNetworks(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	aps, err := nm.GetAccessPoints()
	if err != nil {
		t.Error(err)
	}

	PrettyPrint(aps)
}

func TestStartStopHotspot(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	hs := &Hotspot{
		SSID:           "aqueduct-ap",
		Password:       "12345678",
		Mode:           "ap",
		GatewayAddress: "10.42.0.1",
	}

	if err := nm.StartHotspot(hs); err != nil {
		t.Error(err)
	}

	if err := nm.StopHotspot(hs.SSID); err != nil {
		t.Error(err)
	}

}

func TestUpsertConnection(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	SSID := "aqueduct-test-connection"

	newConn1 := &Connection{
		SSID:     SSID,
		Password: "12345678",
	}

	if err := nm.UpsertConnection(newConn1); err != nil {
		t.Error(err)
	}

	newConn2 := &Connection{
		SSID: SSID,
	}

	if err := nm.UpsertConnection(newConn2); err != nil {
		t.Error(err)
	}

	if err := nm.removeConnectionByName(newConn1.SSID); err != nil {
		t.Error(err)
	}

	conns, err := nm.getSavedConnections()
	if err != nil {
		t.Error(err)
	}

	for _, conn := range conns {
		s, err := conn.GetSettings()
		if err != nil {
			t.Error(err)
		}

		if s["connection"]["id"] == SSID {
			t.Error(conn)
		}
	}

}
