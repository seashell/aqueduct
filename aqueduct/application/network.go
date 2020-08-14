package application

import (
	structs "github.com/seashell/aqueduct/aqueduct/application/structs"
)

type NetworkService interface {
	FindAll(in *structs.ListNetworksInput) (*structs.ListNetworksOutput, error)
}

type NetworkManager interface {
	ListNetworks() ([]string, error)
	DeleteNetwork(ssid string) error
	PutNetwork() error
}

type networkService struct {
}

func NewNetworkService() NetworkService {
	return &networkService{}
}

func (s *networkService) FindAll(in *structs.ListNetworksInput) (*structs.ListNetworksOutput, error) {

	// Inject NetworkManager impl into this service and use it here

	mockData := []*structs.GetNetworkOutput{
		{SSID: stringToPtr("a-network"), RSSI: intToPtr(67), Security: stringToPtr("WPA/PSK"), IsConfigured: boolToPtr(false)},
		{SSID: stringToPtr("b-network"), RSSI: intToPtr(12), Security: stringToPtr("WPA/PSK"), IsConfigured: boolToPtr(true)},
		{SSID: stringToPtr("c-network"), RSSI: intToPtr(32), Security: stringToPtr("WEP"), IsConfigured: boolToPtr(true)},
		{SSID: stringToPtr("d-network"), RSSI: intToPtr(67), Security: stringToPtr("WPA/PSK"), IsConfigured: boolToPtr(false)},
	}

	return &structs.ListNetworksOutput{
		Items: mockData,
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
