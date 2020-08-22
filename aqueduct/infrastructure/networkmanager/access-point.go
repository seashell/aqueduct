package networkmanager

// AccessPoint :
type AccessPoint struct {
	ssid string
	rssi int
}

// SSID :
func (ap *AccessPoint) SSID() string {
	return ap.ssid
}

// RSSI :
func (ap *AccessPoint) RSSI() int {
	return ap.rssi
}

// Security :
func (ap *AccessPoint) Security() string {
	return "N/A"
}

// IsConfigured :
func (ap *AccessPoint) IsConfigured() bool {
	return false
}
