package command

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"strings"

	aqueduct "github.com/seashell/aqueduct/aqueduct"
	cli "github.com/seashell/aqueduct/pkg/cli"
	log "github.com/seashell/aqueduct/pkg/log"
	logrus "github.com/seashell/aqueduct/pkg/log/logrus"
	"github.com/seashell/aqueduct/version"
)

// AgentCommand :
type AgentCommand struct {
	UI cli.UI
}

// Name :
func (c *AgentCommand) Name() string {
	return "agent"
}

// Synopsis :
func (c *AgentCommand) Synopsis() string {
	return "Runs an aqueduct agent"
}

// Run :
func (c *AgentCommand) Run(ctx context.Context, args []string) int {

	config := c.parseConfig(args)

	logger, err := logrus.NewLoggerAdapter(logrus.Config{
		LoggerOptions: log.LoggerOptions{
			Prefix: "agent: ",
			Level:  logrus.Debug,
		},
	})
	if err != nil {
		c.UI.Error(err.Error())
		return 1
	}

	server, err := aqueduct.NewServer(config)
	if err != nil {
		c.UI.Error("==> " + "Error initializing agent: " + err.Error() + "\n")
		return 1
	}

	defer func() {
		logger.Debugf("Shutting down aqueduct agent...")
		server.Shutdown()
	}()

	c.printConfig(config)

	c.UI.Output("==> Aqueduct agent started! Log data will stream in below:\n")

	return c.handleSignals()
}

// parseConfig
func (c *AgentCommand) parseConfig(args []string) *aqueduct.Config {

	var configPath string

	flags := FlagSet(c.Name())

	flags.Usage = func() {
		c.UI.Output(c.Help())
	}

	cmdConfig := &aqueduct.Config{
		Ports:   &aqueduct.Ports{},
		Hotspot: &aqueduct.Hotspot{},
	}

	// General options
	flags.StringVar(&configPath, "config", "", "")
	flags.StringVar(&cmdConfig.BindAddr, "bind", "", "")
	flags.StringVar(&cmdConfig.DataDir, "data-dir", "", "")
	flags.StringVar(&cmdConfig.LogLevel, "log-level", "", "")

	// Agent options
	flags.IntVar(&cmdConfig.Ports.HTTP, "http-port", 0, "")
	flags.BoolVar(&cmdConfig.Hotspot.Enabled, "enable-hotspot", false, "")
	flags.StringVar(&cmdConfig.Hotspot.SSID, "hotspot-ssid", "", "")
	flags.StringVar(&cmdConfig.Hotspot.Password, "hotspot-password", "", "")

	if err := flags.Parse(args); err != nil {
		c.UI.Error("==> Error: " + err.Error() + "\n")
		return nil
	}

	config := aqueduct.DefaultConfig()

	config = config.Merge(cmdConfig)
	if !config.IsValid() {
		return nil
	}

	return config
}

// printConfig
func (c *AgentCommand) printConfig(config *aqueduct.Config) {

	info := map[string]string{
		"bind addr": config.BindAddr,
		"log level": config.LogLevel,
		"version":   version.GetVersion().VersionNumber(),
	}

	padding := 18
	c.UI.Output("==> Aqueduct agent configuration:\n")
	for k := range info {
		c.UI.Info(fmt.Sprintf(
			"%s%s: %s",
			strings.Repeat(" ", padding-len(k)),
			strings.Title(k),
			info[k]))
	}
	c.UI.Output("")
}

// handleSignals waits for specific signals and returns
func (c *AgentCommand) handleSignals() int {

	signalCh := make(chan os.Signal, 1)
	signal.Notify(signalCh, os.Interrupt)

	// Wait until a signal is received
	var sig os.Signal
	select {
	case s := <-signalCh:
		sig = s
	}

	c.UI.Output(fmt.Sprintf("Caught signal: %v", sig))

	return 1
}

// Help :
func (c *AgentCommand) Help() string {
	h := `
Usage: aqueduct agent [options]
	
  Starts the Aqueduct agent and runs until an interrupt is received.
  
  The Aqueduct agent's configuration primarily comes from the config
  files used, but a subset of the options may also be passed directly
  as CLI arguments.

General Options:

  -bind=<addr>
    The address the agent will bind to for all of its various network
    services. The individual services that run bind to individual
    ports on this address. Defaults to 127.0.0.1.

  -data-dir=<path>
    The data directory where all state will be persisted.

  -config=<path>
    The path to a config file to use for configuring the Aqueduct agent.

  -log-level=<level>
    Specify the verbosity level of Aqueduct's logs. Valid values include
    DEBUG, INFO, WARN, ERROR, and FATAL in decreasing order of verbosity.
	 The	default is INFO.
	
Agent Options:
	-http-port=<port>
	 The port where the agent will serve both it's UI and HTTP API. 
	 Defaults to 9090.

	-enable-hotspot
	 Specify if the agent should start a hotspot connection. 
	 Defaults to false.

	-hotspot-ssid=<name>
	 Specify the hotspot name, in case the agent is configured to 
	 start a hotspot connection. Defaults to "aqueduct-ap".

	-hotspot-password=<password>
	 Specify the hotspot password, in case the agent is configured to 
	 start a hotspot connection. Defaults to an empty password.

`
	return strings.TrimSpace(h)
}
