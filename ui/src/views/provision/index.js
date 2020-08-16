import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Portal } from 'react-portal'

import Box from '_components/box'
import Text from '_components/text'
import Icon from '_components/icon'
import Button from '_components/button'
import SearchInput from '_components/inputs/search-input'
import { Bars as Spinner } from '_components/spinner'
import { icons } from '_assets/'

import File from './file'

const Container = styled(Box)`
  flex-direction: column;
`

const FileManagerHeader = styled(Box)`
  justify-content: flex-end;
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

const FilesBrowserView = () => {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [searchString, setSearchString] = useState('')

  const { getRootProps, getInputProps, open: openFileDialog, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: files => {
      console.log('UPLOAD: ', files)
    },
  })

  useEffect(() => {}, [])

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

  const files = [
    { name: 'tools', isDir: true },
    { name: 'aaa/instructions.txt' },
    { name: 'drago.hcl' },
  ]
    .sort(el => (el.isDir ? -1 : 1))
    .filter(el => el.name.includes(searchString))

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
        {files.map(el => (
          <File
            name={el.name}
            isDir={el.isDir}
            isSelected={selectedFiles !== null && selectedFiles.indexOf(el.name) !== -1}
            isSelecting={selectedFiles !== null}
            onClick={() => handleFileClicked(el.name)}
          />
        ))}
      </Box>
    </Container>
  )
}

export default FilesBrowserView
