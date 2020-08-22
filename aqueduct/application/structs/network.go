package structs

// GetNetworkInput :
type GetNetworkInput struct {
	ID *string `json:"id" validate:"required,uuid4"`
}

// GetNetworkOutput :
type GetNetworkOutput struct {
	SSID         *string `json:"ssid"`
	RSSI         *int    `json:"rssi"`
	Security     *string `json:"security"`
	IsConfigured *bool   `json:"isConfigured"`
}

// ConfigureNetworkInput :
type ConfigureNetworkInput struct {
	SSID     *string
	Password *string `json:"password"`
}

// ConfigureNetworkOutput :
type ConfigureNetworkOutput struct {
}

// ListNetworksOutput :
type ListNetworksOutput struct {
	Items []*GetNetworkOutput `json:"items"`
}
