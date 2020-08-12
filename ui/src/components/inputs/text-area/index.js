import styled from 'styled-components'
import { space, layout, size } from 'styled-system'

const TextArea = styled.textarea`
  outline: none;
  resize: vertical;
  box-shadow: none;
  box-sizing: border-box;

  font-family: Lato;
  font-size: 14px;

  padding-bottom: 16px;
  padding-left: 13.6px;
  padding-right: 24.8px;
  padding-top: 16px;

  border: 1px solid ${props => props.theme.colors.neutralLighter};
  border-radius: 2px;
  width: 100%;
  :focus {
    border: 1px solid ${props => props.theme.colors.primary};
  }
  :disabled {
    background: inherit;
    opacity: 0.5;
    border: none;
  }
  :invalid {
    border: 1px solid ${props => props.theme.colors.danger};
  }
  ${space}
  ${layout}
  ${size}
`

export default TextArea
