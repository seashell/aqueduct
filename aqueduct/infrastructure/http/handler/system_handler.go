package handler

import (
	application "github.com/seashell/aqueduct/aqueduct/application"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

// SystemHandlerAdapter :
type SystemHandlerAdapter struct {
	http.BaseHandlerAdapter
	service application.SystemInfoService
	logger  log.Logger
}

// NewSystemHandlerAdapter :
func NewSystemHandlerAdapter(service application.SystemInfoService, logger log.Logger) *SystemHandlerAdapter {

	a := &SystemHandlerAdapter{}
	a.service = service
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.info)

	return a
}

func (a *SystemHandlerAdapter) info(resp http.Response, req *http.Request) (interface{}, error) {
	return a.service.GetInfo()
}
