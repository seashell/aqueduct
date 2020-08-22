import React from 'react'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'

const Security = () => (
  <Box type="padded" alignItems="center" border="discrete" height="120px">
    <Box flexDirection="column">
      <Text textStyle="subtitle">Log out of all devices</Text>
      <Text textStyle="body" mt={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    </Box>
    <Box ml="auto" height="100%" alignItems="flex-start">
      <Button disabled ml="auto" variant="neutral" width="220px" borderRadius={3}>
        Log out
      </Button>
    </Box>
  </Box>
)
export default Security
