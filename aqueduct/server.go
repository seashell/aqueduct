package aqueduct

import (
	"context"
	"fmt"
	"os"
	"sync"
	"time"

	application "github.com/seashell/aqueduct/aqueduct/application"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	handler "github.com/seashell/aqueduct/aqueduct/infrastructure/http/handler"
	dnsmasq "github.com/seashell/aqueduct/pkg/dnsmasq"
	log "github.com/seashell/aqueduct/pkg/log"
	logrus "github.com/seashell/aqueduct/pkg/log/logrus"
	"github.com/seashell/aqueduct/pkg/networkmanager"
	ui "github.com/seashell/aqueduct/ui"
)

type Server struct {
	config *Config
	logger log.Logger

	shutdown     bool
	shutdownLock sync.Mutex

	httpServer *http.Server

	services struct {
		networks application.NetworkService
		system   application.SystemService
	}

	shutdownCtx    context.Context
	shutdownCancel context.CancelFunc
	shutdownCh     <-chan struct{}
}

// Create a new Aqueduct server, potentially returning an error
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

	s.services.networks = application.NewNetworkService()
	s.services.system = application.NewSystemService()

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
			"/api/healthcheck/": handler.NewHealthcheckHandlerAdapter(s.logger),
			"/api/filesystem/":  handler.NewFileSystemHandlerAdapter(s.config.DataDir, s.logger),
			"/api/networks/":    handler.NewNetworkHandlerAdapter(s.services.networks, s.logger),
			"/api/system/":      handler.NewSystemHandlerAdapter(s.services.system, s.logger),
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

// TODO: move this into an application service
func Serve() {

	nm, err := networkmanager.NewNetworkManager()
	err = nil
	if err != nil {
		panic(err)
	}

	//TODO: bind dnsmasq execution to this program, so that if it closes/crashes, dnsmasq is stopped
	go func() {
		fmt.Println("==> Starting dnsmasq ...")
		err = dnsmasq.StartDnsmasq()
		if err != nil {
			panic(err)
		}
	}()

	fmt.Println("==> Starting new access point ...")
	err = nm.StartAccessPoint()
	if err != nil {
		panic(err)
	}

	fmt.Println("==> Waiting 600 seconds ...")
	time.Sleep(600 * time.Second)

	fmt.Println("==> Stopping access point ...")
	err = nm.StopAccessPoint()
	if err != nil {
		panic(err)
	}

}
