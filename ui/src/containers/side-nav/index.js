import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '_graphql/actions/projects'

import { icons } from '_assets/'

import Text from '_components/text'
import Avatar from '_components/avatar'
import Icon from '_components/icon'
import Badge from '_components/badge'

import { Container, CollapsibleSection, NavLink, NewProjectNav, StyledSeparator } from './styled'

import Brand from './brand'

const SideNav = props => {
  const getProjectsQuery = useQuery(GET_PROJECTS, {
    variables: {},
  })

  const isLoading = getProjectsQuery.loading

  const projects = getProjectsQuery.data ? getProjectsQuery.data.result.items : []

  return (
    <Container {...props}>
      <Brand />
      <CollapsibleSection title="Projects" isOpen>
        {!isLoading &&
          projects.map(el => (
            <NavLink key={el.id} to={`/projects/${el.id}`} display="flex">
              {/* <Jdenticon size="24" borderRadius={2} mr={2} value={el.name} /> */}
              <Avatar textSizeRatio={2} name={el.name} size="24" mr={2} round={false} />
              <Text>{el.name}</Text>
            </NavLink>
          ))}
        <NewProjectNav to="/projects/new" display="flex">
          <Icon icon={<icons.Plus />} size="22px" mr={2} p={1} />
          <Text>New Project</Text>
        </NewProjectNav>
      </CollapsibleSection>
      <StyledSeparator />
      <CollapsibleSection title="Explore" isOpen>
        <NavLink to="/platforms">Platforms</NavLink>
        <NavLink disabled to="/marketplace">
          <div style={{ filter: 'brightness(0.5)' }}>App catalog</div>
          <Badge ml={2}>Soon</Badge>
        </NavLink>
      </CollapsibleSection>
      <StyledSeparator />
      <CollapsibleSection title="Account" isOpen>
        <NavLink to="/account">Settings</NavLink>
      </CollapsibleSection>
    </Container>
  )
}

SideNav.defaultProps = {
  colors: 'darkHighContrast',
}

export default SideNav
