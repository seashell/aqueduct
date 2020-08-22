package http

import (
	log "github.com/seashell/aqueduct/pkg/log"
)

// ServerConfig :
type ServerConfig struct {
	// Server bind address in the form host:port
	BindAddress string

	// Handlers contains a mapping of paths to http.Handler structs
	Handlers map[string]HandlerAdapter

	// Logger
	Logger log.Logger
}

// DefaultConfig :
func DefaultConfig() *ServerConfig {
	return &ServerConfig{
		BindAddress: "0.0.0.0:9898",
		Handlers:    map[string]HandlerAdapter{},
	}
}

// Merge :
func (s *ServerConfig) Merge(b *ServerConfig) *ServerConfig {
	result := *s
	if b.BindAddress != "" {
		result.BindAddress = b.BindAddress
	}
	if b.Logger != nil {
		result.Logger = b.Logger
	}
	if b.Handlers != nil {
		result.Handlers = b.Handlers
	}
	return &result
}
