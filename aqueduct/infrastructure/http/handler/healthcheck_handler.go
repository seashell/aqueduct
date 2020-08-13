package handler

import (
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

type HealthcheckHandlerAdapter struct {
	http.BaseHandlerAdapter
	logger log.Logger
}

func NewHealthcheckHandlerAdapter(logger log.Logger) *HealthcheckHandlerAdapter {

	a := &HealthcheckHandlerAdapter{}
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.healthcheck)

	return a
}

func (a *HealthcheckHandlerAdapter) healthcheck(resp http.Response, req *http.Request) (interface{}, error) {
	return nil, nil
}
