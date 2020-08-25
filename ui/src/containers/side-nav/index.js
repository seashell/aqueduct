import React from 'react'

import nav from '_containers/nav'
import Box from '_components/box'
import Separator from '_components/separator'

import { Container, NavLink, CollapsibleSection, CollapsibleSectionTitle } from './styled'

import Brand from './brand'

const SideNav = (props) => (
  <Container {...props}>
    <Brand />
    <Box flexDirection="column" pt={3}>
      <CollapsibleSection
        headerProps={{ mx: 2, my: 2 }}
        title={<CollapsibleSectionTitle>Setup</CollapsibleSectionTitle>}
        isOpen
      >
        {nav.options
          .filter((el) => !el.devOnly)
          .map((el) => (
            <NavLink key={el.title} to={el.to}>
              {el.title}
            </NavLink>
          ))}
      </CollapsibleSection>
      <Separator bg="neutralLighter" my={2} />
      <CollapsibleSection
        headerProps={{ mx: 2, my: 2 }}
        title={<CollapsibleSectionTitle>Development</CollapsibleSectionTitle>}
        isOpen
      >
        {nav.options
          .filter((el) => el.devOnly)
          .map((el) => (
            <NavLink key={el.title} to={el.to}>
              {el.title}
            </NavLink>
          ))}
      </CollapsibleSection>
    </Box>
  </Container>
)

SideNav.defaultProps = {
  colors: 'darkHighContrast',
}

export default SideNav
