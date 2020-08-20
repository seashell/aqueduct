package structs

type GetNetworkInput struct {
	ID *string `json:"id" validate:"required,uuid4"`
}

type GetNetworkOutput struct {
	SSID         *string `json:"ssid"`
	RSSI         *int    `json:"rssi"`
	Security     *string `json:"security"`
	IsConfigured *bool   `json:"isConfigured"`
}

type ListNetworksInput struct {
}

type ListNetworksOutput struct {
	Items []*GetNetworkOutput `json:"items"`
}
