import styled from 'styled-components'
import { color, layout, space } from 'styled-system'

const Tag = styled.span`
  height: 11px;
  padding: 4px;
  display: block;
  border-radius: 4px;
  font-size: 10px;
  color: ${props => props.theme.colors.neutralDarker};
  background: ${props => props.theme.colors.neutralLighter};
  text-transform: capitalize;
  ${color}
  ${layout}
  ${space}
`

export default Tag
