import React from 'react'

import nav from '_containers/nav'
import Box from '_components/box'
import Separator from '_components/separator'

import { Container, NavLink, CollapsibleSection } from './styled'

import Brand from './brand'

const SideNav = props => (
  <Container {...props}>
    <Brand />
    <Box flexDirection="column" pt={3}>
      <CollapsibleSection title="Setup" isOpen>
        {nav.options
          .filter(el => !el.devOnly)
          .map(el => (
            <NavLink to={el.to}>{el.title}</NavLink>
          ))}
      </CollapsibleSection>
      <Separator bg="neutralLighter" my={2} />
      <CollapsibleSection title="Development" isOpen>
        {nav.options
          .filter(el => el.devOnly)
          .map(el => (
            <NavLink to={el.to}>{el.title}</NavLink>
          ))}
      </CollapsibleSection>
    </Box>
  </Container>
)

SideNav.defaultProps = {
  colors: 'darkHighContrast',
}

export default SideNav
