package networkmanager

import (
	"fmt"
	"testing"
)

func TestListWifiNetworks(t *testing.T) {
	nm, err := NewNetworkManager()
	if err != nil {
		t.Error(err)
	}

	aps, err := nm.GetAccessPoints()
	if err != nil {
		t.Error(err)
	}

	fmt.Println(aps)
}
