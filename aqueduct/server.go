package aqueduct

import (
	"context"
	"fmt"
	"os"
	"sync"

	application "github.com/seashell/aqueduct/aqueduct/application"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	handler "github.com/seashell/aqueduct/aqueduct/infrastructure/http/handler"
	networkmanager "github.com/seashell/aqueduct/aqueduct/infrastructure/networkmanager"
	log "github.com/seashell/aqueduct/pkg/log"
	logrus "github.com/seashell/aqueduct/pkg/log/logrus"
	ui "github.com/seashell/aqueduct/ui"
)

// Server :
type Server struct {
	config *Config
	logger log.Logger

	shutdown     bool
	shutdownLock sync.Mutex

	httpServer *http.Server
	nm         *networkmanager.NetworkManager

	services struct {
		networks application.NetworkService
		system   application.SystemInfoService
	}

	shutdownCtx    context.Context
	shutdownCancel context.CancelFunc
	shutdownCh     <-chan struct{}
}

// NewServer creates a new Aqueduct server, potentially returning an error
func NewServer(config *Config) (*Server, error) {

	logger, err := logrus.NewLoggerAdapter(logrus.Config{
		LoggerOptions: log.LoggerOptions{
			Prefix: "aqueduct: ",
			Level:  logrus.Debug,
		},
	})
	if err != nil {
		panic(err)
	}

	s := &Server{
		config: config,
		logger: logger,
	}

	s.shutdownCtx, s.shutdownCancel = context.WithCancel(context.Background())
	s.shutdownCh = s.shutdownCtx.Done()

	if _, err := os.Stat(s.config.DataDir); os.IsNotExist(err) {
		os.Mkdir(s.config.DataDir, 0755)
	}

	nm, err := networkmanager.NewNetworkManager()
	if err != nil {
		return nil, err
	}

	err = nm.PopulateCache()
	if err != nil {
		return nil, err
	}

	if config.Hotspot.Enabled == true {

		s.logger.Debugf("Starting WiFi Hotspot ...")

		if err := nm.StartHotspot(&networkmanager.Hotspot{
			SSID:           config.Hotspot.SSID,
			Mode:           config.Hotspot.Mode,
			Password:       config.Hotspot.Password,
			GatewayAddress: config.Hotspot.GatewayAddress,
		}); err != nil {
			return nil, err
		}
	}

	s.nm = nm
	s.services.networks = application.NewNetworkService(nm)
	s.services.system = application.NewSystemInfoService()

	// Setup HTTP server
	if err := s.setupHTTPServer(); err != nil {
		return nil, err
	}

	return s, nil
}

func (s *Server) setupHTTPServer() error {

	config := &http.ServerConfig{
		Logger:      s.logger,
		BindAddress: fmt.Sprintf("%s:%d", s.config.BindAddr, s.config.Ports.HTTP),
		Handlers: map[string]http.HandlerAdapter{
			"/static/":         handler.NewStaticHandlerAdapter(s.config.DataDir),
			"/healthcheck/":    handler.NewHealthcheckHandlerAdapter(s.logger),
			"/api/filesystem/": handler.NewFileSystemHandlerAdapter(s.config.DataDir, s.logger),
			"/api/networks/":   handler.NewNetworkHandlerAdapter(s.services.networks, s.logger),
			"/api/system/":     handler.NewSystemHandlerAdapter(s.services.system, s.logger),
			"/ws/console/":     handler.NewConsoleHandlerAdapter(s.logger),
		},
	}

	if s.config.UI {
		config.Handlers["/ui/"] = handler.NewSPAHandlerAdapter(ui.Bundle)
		config.Handlers["/"] = handler.NewFallthroughHandlerAdapter("/ui/")
	}

	httpServer, err := http.NewServer(config)
	if err != nil {
		return err
	}

	s.httpServer = httpServer

	s.httpServer.Run()

	return nil
}

// Shutdown :
func (s *Server) Shutdown() error {
	if s.config.Hotspot.Enabled {
		s.nm.StopHotspot()
	}
	return nil
}
