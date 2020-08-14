import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const GET_INFO = gql`
  query getInfo {
    result: info @rest(type: "SystemInfo", path: "system/") {
      os
      aqueduct
      drago
      nomad
      vault
    }
  }
`
