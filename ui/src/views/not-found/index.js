import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import { illustrations } from '_assets/'

const Container = styled(Box)`
  flex-direction: column;
`

const StyledBox = styled(Box).attrs({
  border: '',
  height: 'auto',
})`
  svg {
    height: 200px;
    max-width: 100%;
  }
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const NotFound = () => {
  useEffect(() => {}, [])

  return (
    <Container>
      <StyledBox>
        <illustrations.NotFound />
        <Text textStyle="subtitle" mt={3}>
          Page not found
        </Text>
        <Text textStyle="description" my={3}>
          {`The page you're trying to access does not exist or has been moved.`}
        </Text>
      </StyledBox>
    </Container>
  )
}

export default NotFound
