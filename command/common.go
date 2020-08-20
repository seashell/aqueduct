package command

import (
	"flag"
	"fmt"
	"strings"

	cli "github.com/seashell/aqueduct/pkg/cli"
)

// RootFlagSet :
type RootFlagSet struct {
	*flag.FlagSet
	// Attributes containing values parsed from user input (e.g., flags,
	// environment variables, etc) which are not directly required by the
	// command implementation, but are important to provide them with common
	// functionality such as the API client, and avoid replicating code.
	//
	// Address of the Aqueduct server
	address string
}

// FlagSet declares flags that are common to all commands,
// returning a RootFlagSet struct that will hold their values after
// flag.Parse() is called by the command
func FlagSet(name string) *RootFlagSet {

	flags := &RootFlagSet{
		FlagSet: flag.NewFlagSet(name, flag.ContinueOnError),
	}

	flags.Usage = func() {}

	flags.StringVar(&flags.address, "address", "", "")

	// TODO: direct output to UI
	flags.SetOutput(nil)

	return flags
}

// GlobalOptions returns the global usage options string.
func GlobalOptions() string {
	text := `
  --address=<addr>
    The address of the Aqueduct server.
    Overrides the AQUEDUCT_ADDR environment variable if set.
    Default = http://127.0.0.1:9090
`
	return strings.TrimSpace(text)
}

// DefaultErrorMessage returns the default error message for this command
func DefaultErrorMessage(cmd cli.NamedCommand) string {
	return fmt.Sprintf("For additional help try 'aqueduct %s --help'", cmd.Name())
}
