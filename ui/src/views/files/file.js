import React from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import Icon from '_components/icon'
import { icons } from '_assets/'

const Container = styled(Box)`
  height: 36px;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
  :hover {
    //background: ${props => props.theme.colors.neutralLighter};
  }
`

const SelectionIndicator = styled(Box)`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.neutral};
  display: ${props => (props.isSelecting ? 'flex' : 'none')};
  :before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: ${props => props.theme.colors.primary};
    display: ${props => (props.isSelected ? 'block' : 'none')};
  }
`

// eslint-disable-next-line react/prop-types
const File = ({ name, path, isDir, isSelected, isSelecting, onClick }) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <Container onClick={handleClick}>
      <SelectionIndicator mr={2} isSelected={isSelected} isSelecting={isSelecting} />
      <Icon icon={isDir ? <icons.Folder /> : <icons.File />} size="20px" />
      <Text textStyle="body" ml={2}>
        {name}
      </Text>
    </Container>
  )
}

export default File
