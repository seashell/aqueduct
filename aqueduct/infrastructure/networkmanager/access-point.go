package networkmanager

type AccessPoint struct {
	ssid string
	rssi int
}

func (ap *AccessPoint) SSID() string {
	return ap.ssid
}

func (ap *AccessPoint) RSSI() int {
	return ap.rssi
}

func (ap *AccessPoint) Security() string {
	return "N/A"
}

func (ap *AccessPoint) IsConfigured() bool {
	return false
}
