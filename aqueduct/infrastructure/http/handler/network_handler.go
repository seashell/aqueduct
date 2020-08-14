package handler

import (
	application "github.com/seashell/aqueduct/aqueduct/application"
	"github.com/seashell/aqueduct/aqueduct/application/structs"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

type NetworkHandlerAdapter struct {
	http.BaseHandlerAdapter
	service application.NetworkService
	logger  log.Logger
}

func NewNetworkHandlerAdapter(service application.NetworkService, logger log.Logger) *NetworkHandlerAdapter {

	a := &NetworkHandlerAdapter{}
	a.service = service
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.list)

	return a
}

func (a *NetworkHandlerAdapter) list(resp http.Response, req *http.Request) (interface{}, error) {

	in := &structs.ListNetworksInput{}

	return a.service.FindAll(in)
}
