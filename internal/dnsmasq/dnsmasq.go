package dnsmasq

import (
	"os"
	"os/exec"
)


// StartDnsmasq :
func StartDnsmasq() (error) {
	
	cmd := exec.Command("dnsmasq",
								"--address=/#/192.168.42.1",
								"--dhcp-range=192.168.42.2,192.168.42.254",
								"--dhcp-option=option:router,192.168.42.1",
								"--interface=wlp2s0",
								"--keep-in-foreground",
								"--bind-interfaces",
								"--except-interface=lo",
								"--conf-file",
								"--no-hosts",
							)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout
	err := cmd.Run()
	if err != nil {
		return err
	}

	return nil
}
