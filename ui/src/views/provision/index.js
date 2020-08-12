import React, { useEffect } from 'react'
import styled from 'styled-components'

import 'chonky/style/main.css'
import { FileBrowser, FileList, FileToolbar, FileSearch } from 'chonky'

import Box from '_components/box'
import Text from '_components/text'

const Container = styled(Box)`
  flex-direction: column;
`

const FilesBrowserView = () => {
  useEffect(() => {}, [])

  const files = [
    { id: 'xWbZ1', name: 'Instructions.txt' },
    { id: 'xWbZ2', name: 'Tools', isDir: true },
  ]

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Provisioning</Text>
      </Box>
      <Box flexDirection="column" height="60vh">
        <FileBrowser files={files}>
          <FileToolbar />
          <FileSearch />
          <FileList />
        </FileBrowser>
      </Box>
    </Container>
  )
}

export default FilesBrowserView
