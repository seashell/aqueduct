import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Portal } from 'react-portal'

import { useQuery } from '@apollo/client'
import { GET_FILES } from '_graphql/actions/files'
import { useLocation } from '@reach/router'

import { icons } from '_assets/'

import Box from '_components/box'
import Text from '_components/text'
import Icon from '_components/icon'
import Button from '_components/button'
import Collapse from '_components/collapse'
import SearchInput from '_components/inputs/search-input'
import { Bars as Spinner } from '_components/spinner'

import File from './file'

const Container = styled(Box)`
  flex-direction: column;
`

const FileManagerHeader = styled(Box)`
  justify-content: flex-end;
`

const StyledCollapse = styled(Collapse)`
  padding-left: 16px;
`

const UploadButton = props => (
  <Button
    variant="primary"
    display="flex"
    alignItems="center"
    justifyContent="center"
    width="160px"
    height="42px"
    ml={2}
    {...props}
  >
    <Icon icon={<icons.Upload fill="#fff" />} size="16px" mr={1} />
    Upload
  </Button>
)

const FilesView = () => {
  const location = useLocation()

  const [selectedFiles, setSelectedFiles] = useState(null)
  const [searchString, setSearchString] = useState('')

  const { getRootProps, getInputProps, open: openFileDialog, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: files => {
      console.log('UPLOAD: ', files)
    },
  })

  const getFilesQuery = useQuery(GET_FILES, {
    variables: {},
  })

  useEffect(() => {
    getFilesQuery.refetch()
  }, [location])

  const handleToggleSelectionButtonClick = () => {
    if (selectedFiles === null) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(null)
    }
  }

  const handleFileClicked = filename => {
    if (selectedFiles !== null) {
      const idx = selectedFiles.indexOf(filename)
      if (idx === -1) {
        setSelectedFiles(selectedFiles.concat(filename))
      } else {
        setSelectedFiles(selectedFiles.filter(el => el !== filename))
      }
    }
  }

  const handleUploadButtonClick = () => {
    openFileDialog()
  }

  const isLoading = getFilesQuery.loading

  if (isLoading) {
    return <Spinner />
  }

  const files = getFilesQuery.data
    ? getFilesQuery.data.result.items
    : [].sort(el => (el.isDir ? -1 : 1)).filter(el => el.name.includes(searchString))

  const tree = files.reduce((t, file) => {
    let node = t
    file.path.split('/').forEach(el => {
      if (!node[el]) {
        node[el] = {}
      }
      node = node[el]
    })
    node.path = file.path
    node.attrs = {
      name: file.path.split('/').pop(),
      isDir: file.isDir,
      size: file.size,
    }
    return t
  }, {})

  // eslint-disable-next-line no-shadow
  const renderTree = tree => {
    const keys = Object.keys(tree)
    const sortedKeys = keys.sort(k => {
      if (k === 'attrs' || k === 'path') return 0
      if (tree[k].attrs.isDir) {
        return -1
      }
      return 1
    })

    return sortedKeys.map(key => {
      if (key === 'attrs' || key === 'path') return false
      const node = tree[key]
      return node.attrs.isDir ? (
        <StyledCollapse
          title={
            <File
              path={node.path}
              name={node.attrs.name}
              isDir={node.attrs.isDir}
              isSelected={selectedFiles !== null && selectedFiles.indexOf(node.path) !== -1}
              isSelecting={selectedFiles !== null}
              onClick={() => {}}
            />
          }
        >
          {renderTree(node)}
        </StyledCollapse>
      ) : (
        <File
          path={node.path}
          name={node.attrs.name}
          isDir={node.attrs.isDir}
          isSelected={selectedFiles !== null && selectedFiles.indexOf(node.path) !== -1}
          isSelecting={selectedFiles !== null}
          onClick={() => handleFileClicked(node.path)}
        />
      )
    })
  }

  return (
    <Container>
      <Portal>
        <Box style={{ width: 'max-content', position: 'absolute', right: '32px', bottom: '32px' }}>
          <UploadButton onClick={handleUploadButtonClick} position="absolute" />
        </Box>
      </Portal>
      <Box mb={3}>
        <Text textStyle="title">Provisioning</Text>
      </Box>
      <Box my={3} alignItems="center">
        <SearchInput
          width="100%"
          placeholder="Search..."
          onChange={e => setSearchString(e.target.value)}
        />
        <Button
          variant="primaryInverted"
          height="42px"
          width="120px"
          ml={2}
          onClick={handleToggleSelectionButtonClick}
        >
          {selectedFiles === null ? 'Select' : 'Cancel'}
        </Button>
        {selectedFiles != null && (
          <Button variant="danger" height="42px" width="120px" ml={2}>
            Delete
          </Button>
        )}
      </Box>
      <Box
        bg={isDragActive ? 'neutralLighter' : ''}
        {...getRootProps({ className: 'dropzone' })}
        flexDirection="column"
        height="60vh"
      >
        <input {...getInputProps()} />
        {renderTree(tree)}
      </Box>
    </Container>
  )
}

export default FilesView
