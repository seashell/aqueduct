import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import Modal from 'styled-react-modal'
import { useHotkeys } from 'react-hotkeys-hook'
import { grid, space, color, shadow, border } from 'styled-system'

import { icons } from '_assets/'
import Icon from '_components/icon'
import Button from '_components/button'
import Box from '_components/box'
import Link from '_components/link'
import IconButton from '_components/icon-button'

import Brand from './brand'

export const Container = styled.div`
height: 72px;
position: fixed;
box-sizing: border-box;
border-bottom: 1px solid ${props => props.theme.colors.neutralLighter};

top: 0;
right: 0;
left: 0;

z-index: 99;

display: flex;
justify-content: space-between;

.nav-default {
  display: none;
}

// Laptops and above
@media (min-width: 1280px) {
  display: grid;
  height: 72px;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  grid-template-areas: '. brand . nav .';
  .nav-mobile {
    display: none;
  }
  .nav-default {
    display: flex;
  }
}
  
  ${border}
  ${shadow}
  ${color}
  ${space}
  ${grid};
`

Container.defaultProps = {
  backgroundColor: 'white',
  boxShadow: 'light',
  border: 'dark',
}

const NavItems = styled(Box)`
  align-items: center;
  > * + * {
    margin-left: 16px;
  }
`

const Nav = styled(Link)`
  font-weight: 600;
  font-size: 16px;
  color: #434343;

  // Laptops and above
  @media (min-width: 1280px) {
    font-size: 16px;
  }
`

const MobileMenu = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template: 72px 1fr auto / 1fr;

  padding: 0 0;

  background-color: #fff;

  #close-btn {
    padding: 0;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  a {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;
    margin-left: 16px;
    margin-right: auto;
  }
`

const Header = props => {
  const searchInputRef = useRef(null)

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const location = useLocation()

  const onHamburgerButtonClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  useHotkeys('ctrl+b', () => searchInputRef.current.focus())

  const navItems = (
    <>
      <Nav to="/networks">Connect</Nav>
      <Nav to="/provisioning">Provision</Nav>
      <Nav to="/actions">Command</Nav>
      <Nav to="/system">System</Nav>
    </>
  )

  return (
    <Container {...props}>
      <Box gridArea="brand">
        <Brand />
        <NavItems gridArea="nav" className="nav-default" ml={3}>
          {navItems}
        </NavItems>
      </Box>
      <NavItems gridArea="nav" className="nav-mobile">
        <IconButton
          icon={<icons.Hamburger fill="#222" />}
          size="28px"
          px={0}
          onClick={onHamburgerButtonClick}
        />
      </NavItems>
      <NavItems gridArea="nav" className="nav-default">
        <a href="https://www.github.com/seashell/aqueduct/issues">
          <Icon ml="auto" icon={<icons.Buoy />} color="neutralDark" />
        </a>
      </NavItems>

      <Modal
        isOpen={isMobileMenuOpen}
        onBackgroundClick={() => setMobileMenuOpen(false)}
        onEscapeKeydown={() => setMobileMenuOpen(false)}
      >
        <MobileMenu>
          <Box alignItems="center">
            <Brand />
            <Button
              id="close-btn"
              height="max-content"
              variant="discrete"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon icon={<icons.Times />} size="40px" />
            </Button>
          </Box>
          <Box flexDirection="column" mt={3}>
            {navItems}
          </Box>
          <Box bg="#f7f7f9" alignItems="center" p="16px" />
        </MobileMenu>
      </Modal>
    </Container>
  )
}

Header.defaultProps = {
  padding: 3,
}

export default Header
