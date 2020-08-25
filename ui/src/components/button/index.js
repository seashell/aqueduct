import styled from 'styled-components'

import { buttonStyle, shadow, layout, typography, border, space, flexbox } from 'styled-system'

const Button = styled.button`
  font-family: 'Lato';
  font-weight: bold;
  letter-spacing: 0.04em;
  border: none;

  padding: 2px 16px;

  :disabled {
    opacity: 0.5;
    box-shadow: none;
    cursor: not-allowed;
    :hover {
      filter: none;
    }
  }

  &:hover {
    filter: brightness(95%);
    transition: all 0.7s ease;
  }

  ${buttonStyle}
  ${typography}
  ${shadow}
  ${layout}
  ${space}
  ${border}
  ${flexbox}
`

Button.defaultProps = {
  variant: 'primary',
  width: 'max-content',
  height: '48px',
  borderRadius: '48px',
  type: 'button',
}

export default Button
