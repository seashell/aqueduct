package handler

import (
	application "github.com/seashell/aqueduct/aqueduct/application"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

type SystemHandlerAdapter struct {
	http.BaseHandlerAdapter
	service application.SystemService
	logger  log.Logger
}

func NewSystemHandlerAdapter(service application.SystemService, logger log.Logger) *SystemHandlerAdapter {

	a := &SystemHandlerAdapter{}
	a.service = service
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.info)

	return a
}

func (a *SystemHandlerAdapter) info(resp http.Response, req *http.Request) (interface{}, error) {
	return a.service.GetInfo()
}
