package application

import (
	structs "github.com/seashell/aqueduct/aqueduct/application/structs"
)

// NetworkService :
type NetworkService interface {
	FindAll() (*structs.ListNetworksOutput, error)
	Configure(i *structs.ConfigureNetworkInput) (*structs.ConfigureNetworkOutput, error)
}

// AccessPoint :
type AccessPoint interface {
	SSID() string
	RSSI() int
	Security() string
	IsConfigured() bool
}

// Connection :
type Connection struct {
	SSID     string
	Password string
}

// NetworkManager :
type NetworkManager interface {
	ListAccessPoints() ([]AccessPoint, error)
	UpsertConnection(*Connection) error
}

type networkService struct {
	nm NetworkManager
}

// NewNetworkService :
func NewNetworkService(nm NetworkManager) NetworkService {
	return &networkService{nm}
}

// FindAll :
func (s *networkService) FindAll() (*structs.ListNetworksOutput, error) {

	aps, err := s.nm.ListAccessPoints()
	if err != nil {
		return nil, err
	}

	nets := []*structs.GetNetworkOutput{}
	for _, ap := range aps {
		nets = append(nets, &structs.GetNetworkOutput{
			SSID: stringToPtr(ap.SSID()),
			RSSI: intToPtr(ap.RSSI()),
		})
	}

	return &structs.ListNetworksOutput{
		Items: nets,
	}, nil
}

// Configure :
func (s *networkService) Configure(in *structs.ConfigureNetworkInput) (*structs.ConfigureNetworkOutput, error) {

	// TODO: call network configuration in the injected infrastructure object

	err := s.nm.UpsertConnection(&Connection{
		SSID:     *in.SSID,
		Password: *in.Password,
	})
	if err != nil {
		return nil, err
	}
	return &structs.ConfigureNetworkOutput{}, nil
}

func stringToPtr(s string) *string {
	return &s
}

func intToPtr(i int) *int {
	return &i
}

func boolToPtr(b bool) *bool {
	return &b
}
