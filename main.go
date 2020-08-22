//go:generate go generate github.com/seashell/aqueduct/ui

package main

import (
	"context"
	"fmt"
	"os"

	command "github.com/seashell/aqueduct/command"
	cli "github.com/seashell/aqueduct/pkg/cli"
	version "github.com/seashell/aqueduct/version"
)

func init() {
	os.Setenv("TZ", "UTC")
}

func main() {
	os.Exit(Run(os.Args[1:]))
}

func Run(args []string) int {

	cli := setupCLI()

	code, err := cli.Run(context.Background(), args)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error executing CLI: %s\n", err.Error())
		return 1
	}

	return code
}

// setupCLI
func setupCLI() *cli.CLI {

	ui := &cli.SimpleUI{
		Reader:      os.Stdin,
		Writer:      os.Stdout,
		ErrorWriter: os.Stderr,
	}

	cli := cli.New(&cli.Config{
		Name:    "aqueduct",
		Version: version.GetVersion().VersionNumber(),
		Commands: map[string]cli.Command{
			"agent": &command.AgentCommand{UI: ui},
		},
	})

	return cli
}
