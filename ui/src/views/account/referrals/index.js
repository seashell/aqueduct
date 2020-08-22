import React from 'react'

import Box from '_components/box'
import Text from '_components/text'
import Button from '_components/button'

const Referrals = () => (
  <Box type="grid-12">
    <Box type="padded" gridColumn="span 12" alignItems="center" border="discrete">
      <Box flexDirection="column">
        <Text textStyle="subtitle" mb={3}>
          Give $50, Get $25
        </Text>
        <Text textStyle="description">
          Everyone you refer gets $50 in credit over 30 days. Once they’ve spent $25 with us, you
          will get $25. There is no limit to the amount of credit you can earn through referrals.
        </Text>
      </Box>
    </Box>
    <Box type="padded" gridColumn="span 12" border="discrete" justifyContent="space-between">
      <Box flexDirection="column">
        <Text textStyle="subtitle" mb={3}>
          Refer by email
        </Text>
        <Text textStyle="description" mb={3}>
          Import your contacts from Gmail – or enter your contacts manually – and we’ll invite them
          for you.
        </Text>
        <Button disabled variant="primary" width="220px" borderRadius={3} justifySelf="flex-end">
          Invite contacts
        </Button>
      </Box>
    </Box>
  </Box>
)
export default Referrals
