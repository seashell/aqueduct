package http

import (
	"errors"
	"fmt"
	"net"
	"net/http"
	"strings"

	middleware "github.com/seashell/aqueduct/aqueduct/infrastructure/http/middleware"
	log "github.com/seashell/aqueduct/pkg/log"
)

// Server :
type Server struct {
	config     *ServerConfig
	logger     log.Logger
	listener   net.Listener
	listenerCh chan struct{}
	mux        *http.ServeMux
}

// NewServer :
func NewServer(config *ServerConfig) (*Server, error) {

	config = DefaultConfig().Merge(config)

	listener, err := net.Listen("tcp", config.BindAddress)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("error starting HTTP listener: %v", err))
	}

	server := &Server{
		config:     config,
		listener:   listener,
		logger:     config.Logger,
		listenerCh: make(chan struct{}),
		mux:        http.NewServeMux(),
	}

	for pattern, handler := range config.Handlers {
		server.mux.HandleFunc(pattern, middleware.WithCORS(
			middleware.WithLogging(
				http.StripPrefix(strings.TrimSuffix(pattern, "/"), handler).ServeHTTP,
				server.logger,
			),
		))
	}

	return server, nil
}

// Run :
func (s *Server) Run() {
	httpServer := http.Server{
		Addr:    s.listener.Addr().String(),
		Handler: s.mux,
	}

	go func() {
		defer close(s.listenerCh)
		httpServer.Serve(s.listener)
	}()

	s.logger.Debugf("http server started at %s", httpServer.Addr)
}
