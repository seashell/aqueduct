import React from 'react'
import styled from 'styled-components'
import { colorStyle } from 'styled-system'

import { Link } from '@reach/router'

import { ReactComponent as Logo } from '_assets/icons/logo.svg'

const StyledLink = styled(Link)`
  position: relative;

  height: auto;

  display: flex;
  align-items: center;

  &:hover {
    svg {
      opacity: 1;
      transition: all 0.4s linear;
    }
  }
  ${colorStyle}
`

const Brand = props => (
  <StyledLink to="/">
    <Logo width={40} height={40} {...props} />
  </StyledLink>
)

export default Brand
