import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, space } from 'styled-system'

import Separator from '_components/separator'
import Avatar from '_components/avatar'
import List from '_components/list'
import Text from '_components/text'
import Box from '_components/box'
import { useNavigate } from '@reach/router'

const Container = styled(Box)`
  display: block;
  background: white;
`

const ContextSection = styled.section`
  margin: 5px;
`

const ActionsSection = styled.section`
  margin: 5px;
  > :first-child {
    padding-top: 10px;
  }
  > :last-child {
    padding-bottom: 10px;
  }
`

const ContextSectionItem = styled.li`
  display: flex;
  min-width: 210px;
  line-height: 1rem;
  align-items: center;
  ${color}
`

const ActionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;

  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px;
  color: ${props => props.theme.colors.neutralDarkest};

  ${props =>
    props.selected &&
    css`
      background: ${props.theme.colors.primaryLightest};
    `}

  ${color}
  ${space}
`

const UserMenu = ({ hideMenu }) => {
  const navigate = useNavigate()

  const handleProfileButtonClick = () => {
    setTimeout(() => {
      hideMenu()
      navigate('/account/profile')
    }, 200)
  }

  const handleLogoutButtonClick = () => {
    setTimeout(() => {
      hideMenu()
    }, 200)
  }

  return (
    <Container>
      <List>
        <ContextSection>
          <ContextSectionItem bg="primaryLightest">
            <Box m="6px 9px" />
            <Box flexDirection="column" justifyContent="center" m="5px 0" />
          </ContextSectionItem>
        </ContextSection>
        <Separator bg="neutralLighter" my={1} />
        <ActionsSection>
          <ActionItem onClick={handleProfileButtonClick}>My Profile</ActionItem>
          <ActionItem onClick={handleLogoutButtonClick}>Sign out</ActionItem>
        </ActionsSection>
      </List>
    </Container>
  )
}

UserMenu.propTypes = {
  hideMenu: PropTypes.func,
}

UserMenu.defaultProps = {
  hideMenu: () => {},
}

export default UserMenu
