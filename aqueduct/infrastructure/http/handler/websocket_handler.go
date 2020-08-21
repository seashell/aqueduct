package handler

import (
	"io"
	stdhttp "net/http"
	"os/exec"
	"regexp"
	"strings"
	"time"

	"github.com/creack/pty"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
	websocket "golang.org/x/net/websocket"
)

// See https://github.com/GoogleCloudPlatform/kubernetes
var connectionUpgradeRegex = regexp.MustCompile("(^|.*,\\s*)upgrade($|\\s*,)")

// WebsocketSession :
type WebsocketSession struct {
	conn *websocket.Conn
}

// ConsoleHandlerAdapter :
type ConsoleHandlerAdapter struct {
	http.BaseHandlerAdapter
	sessions map[string]*websocket.Conn
	logger   log.Logger
}

// NewConsoleHandlerAdapter :
func NewConsoleHandlerAdapter(logger log.Logger) http.HandlerAdapter {
	a := &ConsoleHandlerAdapter{}
	a.logger = logger
	a.sessions = map[string]*websocket.Conn{}

	a.HandlerFunc("GET", "/", a.handleAll)

	return a
}

func (a *ConsoleHandlerAdapter) handleAll(rw stdhttp.ResponseWriter, req *stdhttp.Request) {

	if isWebsocketRequest(req) {
		websocket.Handler(a.handleWS).ServeHTTP(rw, req)
	} else {
		a.handleHTTP(rw, req)
	}
}

func (a *ConsoleHandlerAdapter) handleHTTP(rw stdhttp.ResponseWriter, req *stdhttp.Request) {
	rw.Write([]byte("websocket-only endpoint"))
}

func (a *ConsoleHandlerAdapter) handleWS(conn *websocket.Conn) {

	cmd := exec.Command("nsenter", "-t", "1", "-m", "-u", "-n", "-i", "bash")

	f, err := pty.Start(cmd)
	if err != nil {
		panic(err)
	}

	err = cmd.Start()
	if err != nil {
		a.logger.Debugf(err.Error())
	}

	go func() {
		for {
			go io.Copy(f, conn)
			io.Copy(conn, f)
		}
	}()

	for {
		time.Sleep(2 * time.Second)
	}
}

func keepalive(conn *websocket.Conn) error {
	return nil
}

func isWebsocketRequest(req *stdhttp.Request) bool {
	return connectionUpgradeRegex.MatchString(strings.ToLower(req.Header.Get("Connection"))) && strings.ToLower(req.Header.Get("Upgrade")) == "websocket"
}
