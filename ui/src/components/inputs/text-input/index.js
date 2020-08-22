import styled from 'styled-components'
import { space, layout, border } from 'styled-system'

const TextInput = styled.input`
  box-sizing: border-box;
  padding: 14px 24.8px 14px 13.6px;
  border: 1px solid ${(props) => props.theme.colors.neutralLighter};
  border-radius: 2px;

  font-family: Lato;
  font-size: 16px;

  width: 100%;
  :focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  :disabled {
    background: rgb(242,242,242);
    cursor: not-allowed;
  }
  :invalid {
    border: 1px solid ${(props) => props.theme.colors.danger};
  }
  ${border}
  ${space}
  ${layout}
`

export default TextInput
