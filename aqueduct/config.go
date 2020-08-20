package aqueduct

const (
	DefaultHTTPPort = 9090
	DefaultAccessPointSSID = "aqueduct-ap"
	DefaultAccessPointPassword = ""
	DefaultAccessPointGatewayAddress = "192.168.42.1"
	DefaultAccessPointMode = "ap"
	DefaultConnectivityCheckTimeout = 30
)

// Config : Aqueduct configuration
type Config struct {
	// UI enabled
	UI bool
	
	// BindAddr
	BindAddr string

	// DataDir is the directory to store our state in
	DataDir string

	// LogLevel
	LogLevel string

	// Ports
	Ports *Ports

	// Hotspot
	Hotspot *Hotspot
}

type Ports struct {
	HTTP int
}

func (c *Config) IsValid() bool {
	// TODO
	return true
}

func (c *Ports) Merge(b *Ports) *Ports {
	result := *c

	if b.HTTP != 0 {
		result.HTTP = b.HTTP
	}

	return &result
}


type Hotspot struct {
	Enabled	bool
	SSID		string
	Mode		string
	Password string
	GatewayAddress string
}

func (c *Hotspot) Merge(b *Hotspot) *Hotspot {
	result := *c

	if b.Enabled {
		result.Enabled = true
	}
	if b.SSID != "" {
		result.SSID = b.SSID
	}
	if b.Mode != "" {
		result.Mode = b.Mode
	}
	if b.Password != "" {
		result.Password = b.Password
	}
	if b.GatewayAddress != "" {
		result.GatewayAddress = b.GatewayAddress
	}

	return &result
}

// DefaultConfig returns the default configuration. Only used as the basis for
// merging agent or test parameters.
func DefaultConfig() *Config {
	return &Config{
		UI:       true,
		BindAddr: "0.0.0.0",
		DataDir:  "/opt/aqueduct/",
		LogLevel: "DEBUG",
		Ports: &Ports{
			HTTP: DefaultHTTPPort,
		},
		Hotspot: &Hotspot{
			Enabled: false,
			SSID: DefaultAccessPointSSID,
			Mode: DefaultAccessPointMode,
			Password: DefaultAccessPointPassword,
			GatewayAddress: DefaultAccessPointGatewayAddress,
		},
	}
}

// Merge merges two agent configurations
func (c *Config) Merge(b *Config) *Config {

	if b == nil {
		return c
	}

	result := *c

	if b.UI {
		result.UI = true
	}
	if b.LogLevel != "" {
		result.LogLevel = b.LogLevel
	}
	if b.DataDir != "" {
		result.DataDir = b.DataDir
	}
	if b.BindAddr != "" {
		result.BindAddr = b.BindAddr
	}

	// Apply the ports config
	if result.Ports == nil && b.Ports != nil {
		ports := *b.Ports
		result.Ports = &ports
	} else if b.Ports != nil {
		result.Ports = result.Ports.Merge(b.Ports)
	}

	// Apply the hotspot config
	if result.Hotspot == nil && b.Hotspot != nil {
		hotspot := *b.Hotspot
		result.Hotspot = &hotspot
	} else if b.Hotspot != nil {
		result.Hotspot = result.Hotspot.Merge(b.Hotspot)
	}


	return &result
}