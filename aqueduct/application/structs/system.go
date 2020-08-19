package structs

type SystemInfoOutput struct {
	OS          string `json:"os"`
	MAC         string `json:"mac"`
	Hostname    string `json:"hostname"`
	ProductUUID string `json:"productId"`
	Aqueduct    string `json:"aqueduct"`
	Drago       string `json:"drago"`
	Nomad       string `json:"nomad"`
	Consul      string `json:"consul"`
}
