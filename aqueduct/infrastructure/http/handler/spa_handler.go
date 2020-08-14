package handler

import (
	stdhttp "net/http"
	"strings"

	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
)

type SPAHandlerAdapter struct {
	http.BaseHandlerAdapter
	fsHandler http.HandlerAdapter
}

// NewFilesystemHandlerAdapter creates a new handler adapter for delivering
// static files from a filesystem over HTTP
func NewSPAHandlerAdapter(fs stdhttp.FileSystem) http.HandlerAdapter {

	a := &SPAHandlerAdapter{
		fsHandler: stdhttp.FileServer(fs),
	}

	a.RegisterHandlerFunc("GET", "/*filepath", a.spa)

	return a
}

func (a *SPAHandlerAdapter) spa(resp http.Response, req *http.Request) (interface{}, error) {

	if req.URL.Path != "/" && !strings.HasPrefix(req.URL.Path, "/static") {
		req.URL.Path = "/"
	}
	a.fsHandler.ServeHTTP(resp.ResponseWriter, req.Request)

	return nil, nil
}
