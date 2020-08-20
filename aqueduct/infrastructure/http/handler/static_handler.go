package handler

import (
	stdhttp "net/http"

	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
)

// StaticHandlerAdapter :
type StaticHandlerAdapter struct {
	http.BaseHandlerAdapter
	fsHandler http.HandlerAdapter
}

// NewStaticHandlerAdapter creates a new handler adapter for delivering
// static files over HTTP
func NewStaticHandlerAdapter(path string) http.HandlerAdapter {
	fs := stdhttp.Dir(path)

	a := &StaticHandlerAdapter{
		fsHandler: stdhttp.FileServer(fs),
	}

	a.RegisterHandlerFunc("GET", "/*filepath", a.get)

	return a
}

func (a *StaticHandlerAdapter) get(resp http.Response, req *http.Request) (interface{}, error) {

	a.fsHandler.ServeHTTP(resp.ResponseWriter, req.Request)

	return nil, nil
}
