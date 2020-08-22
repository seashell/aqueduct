import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'

const Container = styled(Box)`
  flex-direction: column;
`

export const StyledButton = styled(Button)``

const SetupSuccessfulView = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="body">
          Your device will now performa complete reboot in order to apply the newest network
          configurations. This might take a couple of minutes. If everything goes well, you will no
          longer have access to this UI.
        </Text>
      </Box>
    </Container>
  )
}

export default SetupSuccessfulView
