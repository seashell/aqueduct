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
import { Bars as Spinner } from '_components/spinner'
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

  const isLoading = getNetworksQuery.loading

  if (isLoading) {
    return <Spinner />
  }

  const networks = getNetworksQuery.data ? getNetworksQuery.data.result.items : []

  const filteredNetworks =
    isLoading || networks === null ? [] : networks.filter((el) => el.ssid.includes(searchString))

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Networks</Text>
      </Box>
      <Box my={3}>
        <SearchInput
          width="100%"
          placeholder="Search..."
          onChange={(e) => setSearchString(e.target.value)}
        />
      </Box>
      <>
        {filteredNetworks.map((el) => (
          <NetworkCard
            key={el.ssid}
            ssid={el.ssid}
            rssi={el.rssi}
            security={el.security}
            configured={el.isConfigured}
            onClick={(ssid) => {
              navigate(`/ui/networks/${ssid}/connect`)
            }}
            onForget={() => {}}
          />
        ))}
      </>
    </Container>
  )
}

export default NetworksView
