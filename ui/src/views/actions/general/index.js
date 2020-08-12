import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'

const Container = styled(Box)`
  flex-direction: column;
`

const SystemDetailsView = () => {
  useEffect(() => {}, [])

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Actions</Text>
      </Box>
      <Box flexDirection="column" alignItems="center" mt="48px">
        <Button variant="primary" width="50%" mt={2}>
          Erase logs
        </Button>
        <Button variant="primary" width="50%" mt={2}>
          Update
        </Button>
        <Button variant="primary" width="50%" mt={2}>
          Reboot
        </Button>
        <Button variant="primary" width="50%" mt={2}>
          Shutdown
        </Button>
      </Box>
    </Container>
  )
}

export default SystemDetailsView
