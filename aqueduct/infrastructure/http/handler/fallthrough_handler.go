package handler

import (
	stdhttp "net/http"

	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
)

// FallthroughHandlerAdapter :
type FallthroughHandlerAdapter struct {
	http.BaseHandlerAdapter
}

// NewFallthroughHandlerAdapter :
func NewFallthroughHandlerAdapter(to string) http.HandlerAdapter {
	a := &FallthroughHandlerAdapter{}

	a.HandlerFunc("GET", "/", func(rw stdhttp.ResponseWriter, req *stdhttp.Request) {
		if req.URL.Path == "/" {
			stdhttp.Redirect(rw, req, to, stdhttp.StatusTemporaryRedirect)
		} else {
			rw.WriteHeader(stdhttp.StatusNotFound)
		}
	})

	return a
}
