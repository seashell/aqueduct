package dnsmasq

import (
	"testing"
)


func TestStartDnsmasq(t *testing.T) {
	c := &Config{
		Address: defaultAddress,
		DhcpRange: defaultdhcpRange,
		DhcpOption: defaultdhcpOption,
		Iface: defaultInterface,
	}

	err := StartDnsmasq(c)
	if err != nil {
		t.Error(err)
	}

}