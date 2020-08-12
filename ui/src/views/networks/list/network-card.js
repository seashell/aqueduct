import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import icons from '_assets/icons'

import Box from '_components/box'
import Text from '_components/text'
import SignalStrengthIndicator from '_components/rssi-indicator'
import Icon from '_components/icon'
import Button from '_components/button'

const Container = styled(Box).attrs({
  display: 'flex',
  border: 'discrete',
  m: 1,
  p: 3,
})`
  align-items: center;
  cursor: pointer;
  height: 72px;
`

const StyledButton = styled(Button).attrs({
  variant: 'primaryInverted',
})`
  height: 28px;
  padding: 0 8px;
  font-size: 14px;
  :hover {
    box-shadow: ${props => props.theme.shadows.medium};
  }
`

const NetworkCard = ({ ssid, rssi, security, configured, onClick, onForget }) => {
  const handleCardClick = e => {
    e.preventDefault()
    e.stopPropagation()
    onClick(ssid)
  }

  const handleForgetButtonClick = e => {
    e.preventDefault()
    e.stopPropagation()
    onForget(ssid)
  }

  return (
    <Container onClick={handleCardClick}>
      <Box alignItems="center" width="100%">
        <SignalStrengthIndicator value={rssi} colorFilled="#00a1ff" />
        <Box ml={3}>
          <Text textStyle="body" fontSize="16px">
            {ssid}
          </Text>
        </Box>
        <Box ml="auto">
          {configured && (
            <StyledButton variant="primaryInverted" onClick={handleForgetButtonClick}>
              Forget
            </StyledButton>
          )}
          <Box width="36px" justifyContent="center" ml={2}>
            {security !== '' && <Icon icon={<icons.Lock />} size={20} color="neutral" />}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

NetworkCard.propTypes = {
  ssid: PropTypes.string.isRequired,
  rssi: PropTypes.string,
  security: PropTypes.string,
  configured: PropTypes.bool,
  onClick: PropTypes.func,
  onForget: PropTypes.func,
}

NetworkCard.defaultProps = {
  rssi: undefined,
  security: undefined,
  configured: false,
  onClick: () => {},
  onForget: () => {},
}

export default NetworkCard
