import styled from 'styled-components'
import { layout, space } from 'styled-system'

const Badge = styled.span`
  padding: 4px;
  border-radius: 4px;
  font-size: 9px;
  color: white;
  background: ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.medium};
  text-transform: uppercase;
  ${layout}
  ${space}
`

export default Badge
