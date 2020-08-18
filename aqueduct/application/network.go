package application

import (
	structs "github.com/seashell/aqueduct/aqueduct/application/structs"
)

type NetworkService interface {
	FindAll(in *structs.ListNetworksInput) (*structs.ListNetworksOutput, error)
}

type AccessPoint interface {
	SSID() string
	RSSI() int
	Security() string
	IsConfigured() bool
}

type NetworkManager interface {
	ListAccessPoints() ([]AccessPoint, error)
}

type networkService struct {
	nm NetworkManager
}

func NewNetworkService(nm NetworkManager) NetworkService {
	return &networkService{nm}
}

func (s *networkService) FindAll(in *structs.ListNetworksInput) (*structs.ListNetworksOutput, error) {

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

func stringToPtr(s string) *string {
	return &s
}

func intToPtr(i int) *int {
	return &i
}

func boolToPtr(b bool) *bool {
	return &b
}
