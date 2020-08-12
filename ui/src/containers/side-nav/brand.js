import React from 'react'
import styled from 'styled-components'
import { colorStyle } from 'styled-system'
import { Link } from '@reach/router'
import { icons } from '_assets/'

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;

  padding-left: 14px;

  height: 76px;

  display: flex;
  align-items: center;

  svg {
    fill: ${props => props.theme.colors.neutralLightest};
    opacity: 0.3;
  }
  &:hover {
    svg {
      opacity: 0.8;
      transition: all 0.4s linear;
    }
  }
  ${colorStyle}
`

const Brand = props => (
  <StyledLink to="/">
    <icons.LogoSimple width={42} height={42} {...props} />
  </StyledLink>
)

export default Brand
