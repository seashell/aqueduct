import styled from 'styled-components'
import { grid, colorStyle, color, space, layout } from 'styled-system'

import Link from '_components/link'
import Collapse from '_components/collapse'
import Separator from '_components/separator'

export const Container = styled.div`
${grid}
${space}
${layout}
${colorStyle}

position: fixed;
width: 200px;

display: flex;
flex-direction: column;
padding-top: 70px;

top:0;
left:0;
bottom:0;

background: ${props => props.theme.colors.primaryDarker};

z-index: 9;
`

export const StyledSeparator = styled(Separator).attrs({
  bg: 'neutralDarkest',
  my: 3,
})``

export const NavLink = styled(Link).attrs(() => ({
  px: 3,
  py: 2,
  getProps: ({ isPartiallyCurrent }) => ({
    style: {
      fontWeight: isPartiallyCurrent ? '600' : '400',
      background: isPartiallyCurrent && 'rgba(255,255,255,0.1)',
    },
  }),
}))`

  * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
   
    display: flex;
    align-items: center;

  font-size: 16px;  
  color: ${({ theme }) => theme.colors.neutralLighter};
  :hover {
    background: rgba(0,0,0,0.2);
  };
  ${color}
  ${space}
  ${layout}
`

export const NewProjectNav = styled(NavLink).attrs({
  getProps: () => {},
})`
  color: ${props => props.theme.colors.green};
  > :first-child {
    fill: ${props => props.theme.colors.green};
    stroke: ${props => props.theme.colors.green};
  }
  :hover {
    background: none;
    > :first-child {
      transition-duration: 0.5s;
      transition-timing-function: linear;
      background: ${props => props.theme.colors.green};
      svg {
        fill: ${props => props.theme.colors.white};
        stroke: ${props => props.theme.colors.white};
      }
    }
  }
`

export const CollapsibleSection = styled(Collapse).attrs({
  px: 3,
  py: 2,
})`
  color: ${props => props.theme.colors.neutral};
  font-weight: 500;
  font-size: 0.76rem;
  letter-spacing: 0.06rem;
  text-transform: uppercase;
`
