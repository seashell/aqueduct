package networkmanager

import (
	"testing"
	"encoding/json"
	"fmt"
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
		SSID: "aqueduct-ap",
		Password: "12345678",
		Mode: "ap",
		GatewayAddress: "10.42.0.1",
	}
	
	if err := nm.StartHotspot(hs);err != nil {
		t.Error(err)
	}
	
	if err := nm.StopHotspot(hs.SSID);err != nil {
		t.Error(err)
	}
	
}

func TestAddRemoveConnectionWithPassword(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	newConn := &Connection{
		SSID: "aquedutc-test-connection",
		Password: "12345678",
	}
	
	if err := nm.AddConnection(newConn);err != nil {
		t.Error(err)
	}

	if err := nm.RemoveConnection(newConn.SSID);err != nil {
		t.Error(err)
	}

}

func TestAddRemoveConnectionWithoutPassword(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	newConn := &Connection{
		SSID: "aquedutc-test-connection",
	}
	
	if err := nm.AddConnection(newConn);err != nil {
		t.Error(err)
	}

	if err := nm.RemoveConnection(newConn.SSID);err != nil {
		t.Error(err)
	}
}