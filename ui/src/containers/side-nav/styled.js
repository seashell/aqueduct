import styled from 'styled-components'
import { grid, colorStyle, color, space, layout } from 'styled-system'

import Link from '_components/link'
import Collapse from '_components/collapse'

export const Container = styled.div`
${grid}
${space}
${layout}
${colorStyle}

position: fixed;
width: 260px;

display: flex;
flex-direction: column;
padding-top: 70px;

top:0;
left:0;
bottom:0;

border-right: 1px solid ${props => props.theme.colors.neutralLight};
background: transparent;

z-index: 9;

display: none;

// Laptops and above
@media (min-width: 1280px) {
  display: flex;
}

`

export const NavLink = styled(Link).attrs(props => ({
  px: 3,
  py: 2,
  getProps: ({ isPartiallyCurrent }) => ({
    style: {
      borderRight: isPartiallyCurrent ? '3px solid' : 'none',
      borderColor: isPartiallyCurrent ? props.theme.colors.primary : '',
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
  color: ${({ theme }) => theme.colors.neutral};
  :hover {
    border-right: 3px solid!important;
    border-color: ${({ theme }) => theme.colors.primary}!important;
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

export const CollapsibleSectionTitle = styled.p`
  color: ${props => props.theme.colors.neutral};
  font-weight: 500;
  font-size: 0.76rem;
  letter-spacing: 0.06rem;
  text-transform: uppercase;
  margin: 8px;
`

export const CollapsibleSection = styled(Collapse).attrs({
  py: 2,
})``
