import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useLocation } from '@reach/router'
import { useQuery } from '@apollo/client'
import { GET_INFO } from '_graphql/actions/system'

import Box from '_components/box'
import Text from '_components/text'

import { Jellyfish as Spinner } from '_components/spinner'

const Container = styled(Box)`
  flex-direction: column;
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
      <Box flexDirection="column">
        <Text textStyle="body">OS: {info.os}</Text>
        <Text textStyle="body">Aqueduct: {info.aqueduct}</Text>
      </Box>
    </Container>
  )
}

export default SystemDetailsView
