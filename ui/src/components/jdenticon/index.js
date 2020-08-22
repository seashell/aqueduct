import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { border } from 'styled-system'

import Box from '_components/box'
import jdenticon from './jdenticon'

const Container = styled(Box)`
  overflow: hidden;
  ${border}
`

window.jdenticon_config = {
  lightness: {
    color: [0.38, 0.76],
    grayscale: [0.43, 0.89],
  },
  saturation: {
    color: 1.0,
    grayscale: 1.0,
  },
  backColor: '#e7e7e7ff',
}

const Jdenticon = ({ value = 'test', size = '100%', ...props }) => {
  const icon = useRef(null)
  useEffect(() => {
    jdenticon.update(icon.current, value)
  }, [value])

  return (
    <Container {...props}>
      <svg data-jdenticon-value={value} height={size} ref={icon} width={size} />
    </Container>
  )
}

Jdenticon.propTypes = {
  size: PropTypes.string,
  value: PropTypes.string.isRequired,
}

Jdenticon.defaultProps = {
  size: '48',
}

export default Jdenticon
