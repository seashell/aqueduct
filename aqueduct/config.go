package aqueduct

const (
	DefaultHTTPPort = 9090
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
	Ports Ports
}

type Ports struct {
	HTTP int
}

// DefaultConfig returns the default configuration. Only used as the basis for
// merging agent or test parameters.
func DefaultConfig() *Config {
	return &Config{
		UI:       true,
		BindAddr: "0.0.0.0",
		DataDir:  "/tmp/aqueduct/",
		LogLevel: "DEBUG",
		Ports: Ports{
			HTTP: DefaultHTTPPort,
		},
	}
}
