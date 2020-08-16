import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '_components/box'
import { color } from 'styled-system'

const Container = styled(Box)`
  width: 30px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
  ${color}
`

const BarsIndicator = ({ value, colorFilled, colorEmpty, ...props }) => {
  const filledBars = Math.floor(value / 20)
  console.log(props)
  return (
    <Container {...props}>
      <svg width="134.55mm" height="115.69mm" version="1.1" viewBox="0 0 134.55 115.69">
        <g transform="translate(231.57 110.83)">
          <rect
            fill={filledBars >= 1 ? colorFilled : colorEmpty}
            x="-231.57"
            y="-14.253"
            width="18.709"
            height="19.109"
            ry="1.1812"
            style={{ paintOrder: 'stroke fill markers' }}
          />
          <rect
            fill={filledBars >= 2 ? colorFilled : colorEmpty}
            x="-202.61"
            y="-24.222"
            width="18.709"
            height="29.078"
            ry="1.1812"
            style={{ paintOrder: 'stroke fill markers' }}
          />
          <rect
            fill={filledBars >= 3 ? colorFilled : colorEmpty}
            x="-173.65"
            y="-43.216"
            width="18.709"
            height="48.071"
            ry="1.1812"
            style={{ paintOrder: 'stroke fill markers' }}
          />
          <rect
            fill={filledBars >= 4 ? colorFilled : colorEmpty}
            x="-144.69"
            y="-71.947"
            width="18.709"
            height="76.803"
            ry="1.1812"
            style={{ paintOrder: 'stroke fill markers' }}
          />
          <rect
            fill={filledBars >= 5 ? colorFilled : colorEmpty}
            x="-115.73"
            y="-110.83"
            width="18.709"
            height="115.69"
            ry="1.1812"
            style={{ paintOrder: 'stroke fill markers' }}
          />
        </g>
      </svg>
    </Container>
  )
}

BarsIndicator.propTypes = {
  value: PropTypes.number,
  colorFilled: PropTypes.string,
  colorEmpty: PropTypes.string,
}

BarsIndicator.defaultProps = {
  value: 0,
  colorFilled: '#0f0',
  colorEmpty: '#eee',
}

export default BarsIndicator
