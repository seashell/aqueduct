import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, color } from 'styled-system'
import { icons } from '_assets'

const Header = styled.div.attrs({
  role: 'button',
})`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
`

Header.defaultProps = {
  paddingTop: 0,
  paddingBottom: 0,
}

const Content = styled.div`
  ${space}
`

const Collapse = ({ title, headerProps, children, ...props }) => {
  const [isCollapseOpen, setCollapseOpen] = useState(props.isOpen)

  const handleHeaderClick = () => {
    setCollapseOpen(!isCollapseOpen)
  }

  return (
    <>
      <Header className="header" onClick={handleHeaderClick} {...headerProps}>
        {title}
        {isCollapseOpen ? <icons.ArrowUp className="indicator" /> : <icons.ArrowDown />}
      </Header>
      {isCollapseOpen && (
        <Content className="content" {...props}>
          {children}
        </Content>
      )}
    </>
  )
}

Collapse.propTypes = {
  headerProps: PropTypes.node,
  title: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
}

Collapse.defaultProps = {
  headerProps: undefined,
  children: undefined,
  isOpen: false,
}

export default Collapse
