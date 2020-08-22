import styled from 'styled-components'
import Box from '_components/box'
import { color, space } from 'styled-system'

export const MenuContainer = styled(Box)`
  display: block;
  background: white;
`

export const MenuContextSection = styled.section`
  margin: 5px;
`

export const MenuActionsSection = styled.section`
  margin: 5px;
  > :first-child {
    padding-top: 10px;
  }
  > :last-child {
    padding-bottom: 10px;
  }
`

export const MenuActionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  min-width: 100px;
  padding: 6px 12px;
  margin: 2px;
  box-sizing: border-box;

  cursor: pointer;
  font-size: 14px;
  color: ${props => props.theme.colors.neutralDarkest};

  ${color}
  ${space}
`
