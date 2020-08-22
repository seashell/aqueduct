import React from 'react'
import styled from 'styled-components'

import Collapse from '_components/collapse'

import File from './file'

const StyledCollapse = styled(Collapse)`
  padding-left: 16px;
`

const Tree = ({ nodes, isSelecting, onNodeSelect, onNodeDeselect, onNodeClick }) => {
  const handleTreeNodeClick = (node) => {
    onNodeClick(node.path)
  }

  //
  const handleTreeNodeSelect = (node) => {
    const shouldSelect = !node.attrs.isSelected
    if (shouldSelect) {
      onNodeSelect(node.path)
    } else {
      onNodeDeselect(node.path)
    }

    Object.keys(node).forEach((k) => {
      if (k !== 'attrs' && k !== 'path') {
        if (shouldSelect) {
          onNodeSelect(node[k].path)
        } else {
          onNodeDeselect(node[k].path)
        }
      }
    })
  }

  const keys = Object.keys(nodes)
  const sortedKeys = keys.sort((k) => {
    if (k === 'attrs' || k === 'path') return 0
    if (nodes[k].attrs.isDir) {
      return -1
    }
    return 1
  })

  return sortedKeys.map((key) => {
    if (key === 'attrs' || key === 'path') return false
    const node = nodes[key]
    return node.attrs.isDir ? (
      <StyledCollapse
        title={
          <File
            path={node.path}
            name={node.attrs.name}
            isDir={node.attrs.isDir}
            isSelected={node.attrs.isSelected}
            isSelecting={isSelecting}
            onSelect={() => handleTreeNodeSelect(node)}
            onClick={() => handleTreeNodeClick(node)}
          />
        }
      >
        <Tree
          nodes={node}
          isSelecting={isSelecting}
          onNodeClick={onNodeClick}
          onNodeSelect={onNodeSelect}
          onNodeDeselect={onNodeDeselect}
        />
      </StyledCollapse>
    ) : (
      <File
        path={node.path}
        name={node.attrs.name}
        isDir={node.attrs.isDir}
        isSelected={node.attrs.isSelected}
        isSelecting={isSelecting}
        onSelect={() => handleTreeNodeSelect(node)}
        onClick={() => handleTreeNodeClick(node)}
      />
    )
  })
}

export default Tree
