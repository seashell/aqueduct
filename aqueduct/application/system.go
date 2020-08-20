package application

import (
	"os/exec"

	"github.com/seashell/aqueduct/aqueduct/application/structs"
	"github.com/seashell/aqueduct/version"
)

// SystemInfoService :
type SystemInfoService interface {
	GetInfo() (*structs.SystemInfoOutput, error)
}

type systemInfoService struct {
}

// NewSystemInfoService :
func NewSystemInfoService() SystemInfoService {
	return &systemInfoService{}
}

// GetInfo :
func (s *systemInfoService) GetInfo() (*structs.SystemInfoOutput, error) {

	os, err := exec.Command("uname", "--kernel-name", "-r").Output()
	if err != nil {
		return nil, err
	}

	hostname, err := exec.Command("uname", "--nodename").Output()
	if err != nil {
		return nil, err
	}

	return &structs.SystemInfoOutput{
		OS:          string(os),
		ProductUUID: "",
		Aqueduct:    version.GetVersion().VersionNumber(),
		Hostname:    string(hostname),
		Nomad:       "",
		Consul:      "",
	}, nil
}
