import gql from 'graphql-tag'

export const GET_NETWORKS = gql`
  query getNetworks {
    result: projects @rest(type: "Page", path: "networks/") {
      items @type(name: "Network") {
        ssid
        rssi
        security
        isConfigured
      }
    }
  }
`

export const CONFIGURE_NETWORK = gql`
  mutation configureNetwork($ssid: String!, $password: String!) {
    configureNetwork(ssid: $ssid, input: { ssid: $ssid, password: $password })
    @rest(method: "PUT", path: "networks/{args.ssid}", type: "Project") {
      id
    }
  }
`
