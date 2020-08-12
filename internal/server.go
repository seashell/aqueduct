package internal

import (
	"fmt"
	"time"

	"github.com/seashell/aqueduct/internal/dnsmasq"
	"github.com/seashell/aqueduct/internal/networkmanager"
)

func Serve() {

	nm, err := networkmanager.NewNetworkManager()
	err = nil
	if err != nil {
		panic(err)
	}

	fmt.Println("==> Scanning access points ...")
	ssids, err := nm.GetSSIDs()
	if err != nil {
		panic(err)
	}

	fmt.Println("==> Available access points:")
	for _, ssid := range ssids {
		fmt.Printf("\t%s\n", ssid)
	}

	//TODO: bind dnsmasq execution to this program, so that if it closes/crashes, dnsmasq is stopped
	go func() {
		fmt.Println("==> Starting dnsmasq ...")
		err = dnsmasq.StartDnsmasq()
		if err != nil {
			panic(err)
		}
	}()

	fmt.Println("==> Starting new access point ...")
	err = nm.StartAccessPoint()
	if err != nil {
		panic(err)
	}

	fmt.Println("==> Waiting 600 seconds ...")
	time.Sleep(600 * time.Second)

	fmt.Println("==> Stopping access point ...")
	err = nm.StoptAccessPoint()
	if err != nil {
		panic(err)
	}

}
