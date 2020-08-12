import React from 'react'
import styled from 'styled-components'
import { Router, Redirect } from '@reach/router'

import Box from '_components/box'
import Text from '_components/text'
import { Nav, HorizontalNavLink as NavLink } from '_components/nav'

import Security from './security'
import Referrals from './referrals'
import Overview from './overview'

const Container = styled(Box)`
  flex-direction: column;
`

const StyledNav = styled(Nav)`
  > * {
    font-size: 16px;
  }
`

const AccountView = () => (
  <Container>
    <Box mb={3}>
      <Text textStyle="title">Settings</Text>
    </Box>

    <Box my={3}>
      <StyledNav>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="security">Security</NavLink>
        <NavLink to="referrals">Referrals</NavLink>
      </StyledNav>
    </Box>

    <Router>
      <Redirect noThrow from="/" to="profile" />
      <Overview path="/profile" default />
      <Security path="/security" />
      <Referrals path="referrals" />
    </Router>
  </Container>
)

export default AccountView
