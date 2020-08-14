package structs

type SystemInfoOutput struct {
	OS       string `json:"os"`
	Aqueduct string `json:"aqueduct"`
	Drago    string `json:"drago"`
	Nomad    string `json:"nomad"`
	Consul   string `json:"consul"`
}
