package networkmanager

type AccessPoint struct {
	ssid string
}

func (ap *AccessPoint) SSID() string {
	return ap.ssid
}

func (ap *AccessPoint) RSSI() int {
	return 100
}

func (ap *AccessPoint) Security() string {
	return "N/A"
}

func (ap *AccessPoint) IsConfigured() bool {
	return false
}
