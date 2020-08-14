import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import 'chonky/style/main.css'
import { FileBrowser, FileList, FileToolbar, FileSearch, ChonkyActions } from 'chonky'

import Box from '_components/box'
import Text from '_components/text'

const Container = styled(Box)`
  flex-direction: column;
`

const FilesBrowserView = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {}, [])

  const fileActions = React.useMemo(
    () => [
      ChonkyActions.CreateFolder, // Adds a button to the toolbar
      ChonkyActions.UploadFiles, // Adds a button
      ChonkyActions.DownloadFiles, // Adds a button
      ChonkyActions.CopyFiles, // Adds a button and a shortcut: Ctrl+C
      ChonkyActions.DeleteFiles, // Adds a button and a shortcut: Delete
    ],
    []
  )

  const handleFileSelected = e => {
    setSelectedFile(e.target.files[0])
  }

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
        <FileBrowser files={files} fileActions={fileActions} enableDragAndDrop>
          <FileSearch />
          <FileList />
        </FileBrowser>
        <input type="file" name="file" onChange={() => {}} />
      </Box>
    </Container>
  )
}

export default FilesBrowserView
