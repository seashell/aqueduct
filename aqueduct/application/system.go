package application

import (
	"os/exec"

	"github.com/seashell/aqueduct/aqueduct/application/structs"
	"github.com/seashell/aqueduct/version"
)

type SystemService interface {
	GetInfo() (*structs.SystemInfoOutput, error)
}

type systemService struct {
}

func NewSystemService() SystemService {
	return &systemService{}
}

func (s *systemService) GetInfo() (*structs.SystemInfoOutput, error) {

	out, err := exec.Command("uname", "-a").Output()
	if err != nil {
		return nil, err
	}

	return &structs.SystemInfoOutput{
		OS:       string(out),
		Aqueduct: version.GetVersion().VersionNumber(),
	}, nil
}
