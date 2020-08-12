import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { GET_NETWORKS } from '_graphql/actions/networks'

import { navigate } from '@reach/router'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'
import SearchInput from '_components/inputs/search-input'
import ErrorState from '_components/error-state'
import EmptyState from '_components/empty-state'
import { Jellyfish as Spinner } from '_components/spinner'
import { useConfirmationDialog } from '_components/confirmation-dialog'

import NetworkCard from './network-card'

const Container = styled(Box)`
  flex-direction: column;
`

export const StyledButton = styled(Button)``

const NetworksView = () => {
  const { confirm } = useConfirmationDialog()

  const [searchString, setSearchString] = useState('')

  const getNetworksQuery = useQuery(GET_NETWORKS, {
    variables: {},
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const isError = false && getNetworksQuery.error
  const isLoading = getNetworksQuery.loading
  const isEmpty = getNetworksQuery.data ? getNetworksQuery.data.result.count === 0 : true

  const networks = getNetworksQuery.data
    ? getNetworksQuery.data.result.items
    : [
        { ssid: 'netw1', rssi: 26, security: 'WEP', configured: false },
        { ssid: 'netw2', rssi: 98, security: '', configured: true },
        { ssid: 'netw3', rssi: 34, security: 'WEP', configured: false },
        { ssid: 'netw4', rssi: 67, security: '', configured: true },
      ]

  const filteredNetworks = isLoading ? [] : networks.filter(el => el.ssid.includes(searchString))

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Networks</Text>
      </Box>
      <Box my={3}>
        <SearchInput
          width="100%"
          placeholder="Search..."
          onChange={e => setSearchString(e.target.value)}
        />
      </Box>
      <>
        {filteredNetworks.map(el => (
          <NetworkCard
            key={el.ssid}
            ssid={el.ssid}
            rssi={el.rssi}
            security={el.security}
            configured={el.configured}
            onClick={ssid => {
              navigate(`networks/${ssid}/connect`)
            }}
            onForget={() => {}}
          />
        ))}
      </>
    </Container>
  )
}

export default NetworksView
