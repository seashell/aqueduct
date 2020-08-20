package handler

import (
	application "github.com/seashell/aqueduct/aqueduct/application"
	"github.com/seashell/aqueduct/aqueduct/application/structs"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

// NetworkHandlerAdapter :
type NetworkHandlerAdapter struct {
	http.BaseHandlerAdapter
	service application.NetworkService
	logger  log.Logger
}

// NewNetworkHandlerAdapter :
func NewNetworkHandlerAdapter(service application.NetworkService, logger log.Logger) *NetworkHandlerAdapter {

	a := &NetworkHandlerAdapter{}
	a.service = service
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.list)
	a.RegisterHandlerFunc("PUT", "/:ssid", a.put)
	a.RegisterHandlerFunc("DELETE", "/:ssid", a.delete)

	return a
}

func (a *NetworkHandlerAdapter) list(resp http.Response, req *http.Request) (interface{}, error) {
	return a.service.FindAll()
}

func (a *NetworkHandlerAdapter) put(resp http.Response, req *http.Request) (interface{}, error) {

	ssid := req.Params["ssid"]

	in := &structs.ConfigureNetworkInput{
		SSID: &ssid,
	}

	bind(req.Body, in)

	return a.service.Configure(in)
}

func (a *NetworkHandlerAdapter) delete(resp http.Response, req *http.Request) (interface{}, error) {
	return nil, nil
}
