import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useLocation } from '@reach/router'
import { useQuery } from '@apollo/client'
import { GET_INFO } from '_graphql/actions/system'

import Box from '_components/box'
import Text from '_components/text'

import { Bars as Spinner } from '_components/spinner'

const Container = styled(Box)`
  flex-direction: column;
`

const InfoTable = styled(Box)`
  flex-direction: column;
`

const InfoRow = styled(Box)`
  padding: 16px 8px;
  height: 48px;
`

const SystemDetailsView = () => {
  const location = useLocation()

  const getSystemInfoQuery = useQuery(GET_INFO, {
    variables: {},
  })

  useEffect(() => {
    getSystemInfoQuery.refetch()
  }, [location])

  const isLoading = getSystemInfoQuery.loading

  if (isLoading) {
    return <Spinner />
  }

  const info = getSystemInfoQuery.data.result

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">System</Text>
      </Box>
      <InfoTable>
        <InfoRow>
          <Text textStyle="strong">Hostname</Text>
          <Text textStyle="body" ml="auto">
            {info.hostname}
          </Text>
        </InfoRow>
        <InfoRow>
          <Text textStyle="strong">OS</Text>
          <Text textStyle="body" ml="auto">
            {info.os}
          </Text>
        </InfoRow>
        <InfoRow>
          <Text textStyle="strong">Aqueduct</Text>
          <Text textStyle="body" ml="auto">
            {info.aqueduct}
          </Text>
        </InfoRow>
      </InfoTable>
    </Container>
  )
}

export default SystemDetailsView
