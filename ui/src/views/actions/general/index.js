import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'
import Icon from '_components/icon'
import { icons } from '_assets/'

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
      <Box flexDirection="row" alignItems="center" mt="48px">
        <Button variant="primary" width="50%" mt={2} mx={2}>
          Erase logs
        </Button>
        <Button variant="primary" width="50%" mt={2} mx={2}>
          Update
        </Button>
        <Button variant="primary" width="50%" mt={2} mx={2}>
          Reboot
        </Button>
        <Button variant="primary" width="50%" mt={2} mx={2}>
          Shutdown
        </Button>
        <Button
          variant="primaryInverted"
          width="50%"
          mt={2}
          mx={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon={<icons.Plus />} size="16px" color="primary" mr={2} />
          New
        </Button>
      </Box>
    </Container>
  )
}

export default SystemDetailsView
