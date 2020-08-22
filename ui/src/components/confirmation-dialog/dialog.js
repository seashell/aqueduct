import React from 'react'
import styled from 'styled-components'

import Button from '_components/button'
import Text from '_components/text'
import Box from '_components/box'

const Container = styled(Box).attrs({
  type: 'padded',
  border: 'discrete',
  bg: 'white',
})`
  min-width: 480px;
  min-height: 300px;
`

// eslint-disable-next-line react/prop-types
const Dialog = ({ title, details, isDestructive, onConfirm, onCancel }) => (
  <Container flexDirection="column" alignItems="center" justifyContent="center">
    <Text mb={3} textStyle="subtitle">
      {title}
    </Text>
    <Text mb={4} textStyle="body">
      {details}
    </Text>
    <Box justifyContent="center">
      <Button
        mr={2}
        variant={isDestructive ? 'danger' : 'primary'}
        onClick={onConfirm}
        isDestructive
      >
        Confirm
      </Button>
      <Button variant={isDestructive ? 'dangerInverted' : 'primaryInverted'} onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  </Container>
)

export default Dialog
