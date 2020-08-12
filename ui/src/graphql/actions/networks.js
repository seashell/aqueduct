import gql from 'graphql-tag'

export const GET_NETWORKS = gql`
  query getNetworks {
    result: projects @rest(type: "Network", path: "networks/") {
      id
      ssid
      rssi
      security
    }
  }
`

export const CONFIGURE_NETWORK = gql`
  mutation configureNetwork($ssid: String!, $password: String!) {
    configureNetwork(input: { ssid: $ssid, password: $password })
      @rest(method: "POST", path: "projects/", type: "Project") {
      id
    }
  }
`
