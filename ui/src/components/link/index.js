import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, typography, border, space, layout } from 'styled-system'

import { Link } from '@reach/router'

const StyledLink = styled(Link)`
  display: inline;

  font-family: Lato !important;
  
  :link {
    text-decoration: none;
    cursor: pointer;
  }

  :visited {
    text-decoration: inherit;
    cursor: auto;
  }

  color: inherit;
  
  :hover {
    ${(props) => props.hoverStyle}
  }

  &[aria-current] {
    ${(props) => props.activeStyle}
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  ${color}
  ${space}
  ${layout}
  ${border}
  ${typography}

`

StyledLink.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default StyledLink
