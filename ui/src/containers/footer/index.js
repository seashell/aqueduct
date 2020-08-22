import React from 'react'
import styled from 'styled-components'
import { grid, space, color } from 'styled-system'
import Text from '_components/text'

const Container = styled.div`
  background: white;
  border-top: 1px solid #f1f1f1;

  grid-area: footer;

  display: flex;
  justify-content: center;

  align-items: center;
  * + * {
    margin-left: 12px;
  }
  ${space}
  ${grid}

  z-index: 99;
`

const StyledLink = styled.a`
  font-family: Lato;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  ${color}
`

StyledLink.defaultProps = {
  color: 'neutralDarker',
}

const Footer = props => (
  <Container {...props}>
    <Text textStyle="detail" fontSize="14px">
      Made with ❤ by Seashell.
    </Text>
  </Container>
)

Footer.defaultProps = {
  padding: 0,
}

export default Footer
