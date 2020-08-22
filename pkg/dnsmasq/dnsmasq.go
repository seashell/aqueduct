package dnsmasq

import (
	"os/exec"
	"syscall"
	"fmt"
	"encoding/json"
)

type Config struct {
	Address string
	DhcpRange string
	DhcpOption string
	Iface string
}

const (
	defaultAddress="/#/192.168.42.1"
	defaultdhcpRange="192.168.42.2,192.168.42.254"
	defaultdhcpOption="option:router,192.168.42.1"
	defaultInterface="wlp2s0"
)

func PrettyPrint(v interface{}) (err error) {
	b, err := json.MarshalIndent(v, "", "  ")
	if err == nil {
			  fmt.Println(string(b))
	}
	return
}

// StartDnsmasq :
func StartDnsmasq(c *Config) (error) {
	PrettyPrint(c)
	go func(){
		cmd := exec.Command("dnsmasq",
		"--address=" + c.Address,
		"--dhcp-range=" + c.DhcpRange,
		"--dhcp-option=" + c.DhcpOption,
		"--interface=" + c.Iface,
		"--keep-in-foreground",
		"--bind-interfaces",
		"--except-interface=lo",
		"--no-hosts",
	)
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Pdeathsig: syscall.SIGTERM,
	}

	cmd.Start()
  }()
	
	return  nil
}