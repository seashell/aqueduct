//go:generate go generate github.com/seashell/aqueduct/ui

package main

import (
	server "github.com/seashell/aqueduct/internal"
)

func main() {
	server.Serve()
}
