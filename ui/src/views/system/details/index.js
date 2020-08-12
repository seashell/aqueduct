import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'

const Container = styled(Box)`
  flex-direction: column;
`

const SystemDetailsView = () => {
  useEffect(() => {}, [])

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">System</Text>
      </Box>
      <Box flexDirection="column">
        <Text textStyle="body">
          Linux hostname 5.0.0-20-generic #21~18.04.1-Ubuntu SMP Thu Jun 27 04:04:37 UTC 2019 x86_64
          x86_64 x86_64 GNU/Linux
        </Text>
      </Box>
    </Container>
  )
}

export default SystemDetailsView
