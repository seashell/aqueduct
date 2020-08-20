import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Portal } from 'react-portal'
import * as _ from 'lodash'

import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { GET_FILES, UPLOAD_FILE, DELETE_FILE } from '_graphql/actions/files'
import { useLocation } from '@reach/router'

import { icons } from '_assets/'

import toast from '_components/toast'

import Box from '_components/box'
import Text from '_components/text'
import Icon from '_components/icon'
import Button from '_components/button'
import SearchInput from '_components/inputs/search-input'
import { Bars as Spinner } from '_components/spinner'

import Tree from './tree'

const Container = styled(Box)`
  flex-direction: column;
`

const UploadButton = (props) => (
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

const buildTree = (nodes) =>
  nodes.reduce((t, node) => {
    let tnode = t
    node.path.split('/').forEach((el) => {
      if (!tnode[el]) {
        tnode[el] = {}
      }
      tnode = tnode[el]
    })
    tnode.path = node.path
    tnode.attrs = {
      name: node.path.split('/').pop(),
      isDir: node.isDir,
      size: node.size,
      url: node.url,
      isSelected: node.isSelected || false,
    }
    return t
  }, {})

const FilesView = () => {
  const location = useLocation()

  const [nodes, setNodes] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [searchString, setSearchString] = useState('')

  const getFilesQuery = useQuery(GET_FILES, {
    variables: {},
    onCompleted: (data) => {
      setNodes(data.result.items)
    },
  })

  const [deleteFile] = useMutation(DELETE_FILE, {
    onCompleted: () => {
      getFilesQuery.refetch().then((res) => {
        setNodes(res.data.result.items)
      })
    },
    onError: () => {
      toast.error('Error deleting files')
    },
  })

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: () => {
      toast.success('Success uploading files')
      getFilesQuery.refetch().then((res) => {
        setNodes(res.data.result.items)
      })
    },
    onError: () => {
      toast.error('Error uploading files')
    },
  })

  const { getRootProps, getInputProps, open: openFileDialog, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (files) => {
      uploadFile({ variables: { input: files } })
    },
  })

  useEffect(() => {
    getFilesQuery.refetch().then((res) => {
      setNodes(res.data.result.items)
    })
  }, [location])

  const handleToggleSelectionButtonClick = () => {
    if (!isSelecting) {
      const updated = nodes.map((n) => {
        n.isSelected = false
        return n
      })
      setNodes(updated)
    }
    setIsSelecting(!isSelecting)
  }

  const handleTreeNodeClick = (path) => {
    const node = nodes.find((n) => n.path === path)
    if (!node.isDir && !isSelecting) {
      // TODO: replace this with URL in the files returned from the API
      const url = `http://${window.location.hostname}:9090/static/${node.path}`
      window.open(url, '_blank')
    }
  }

  const handleTreeNodeSelect = (path) => {
    if (isSelecting) {
      const updated = nodes.map((n) => {
        if (n.path === path) {
          n.isSelected = true
        }
        return n
      })
      setNodes(updated)
    }
  }

  const handleTreeNodeDeselect = (path) => {
    if (isSelecting) {
      const updated = nodes.map((n) => {
        if (n.path === path) {
          n.isSelected = false
        }
        return n
      })
      setNodes(updated)
    }
  }

  const handlDeleteFilesButtonClick = () => {
    nodes.forEach((node) => {
      if (node.isSelected) {
        deleteFile({ variables: { path: node.path } }).then(() => {
          console.log('deleted')
        })
      }
    })
    setIsSelecting(false)
  }

  const handleUploadButtonClick = () => {
    openFileDialog()
  }

  const isLoading = getFilesQuery.loading

  if (isLoading) {
    return <Spinner />
  }

  const filteredNodes = nodes
    .sort((el) => (el.isDir ? -1 : 1))
    .filter((el) => el.path.includes(searchString))

  const tree = buildTree(filteredNodes)

  return (
    <Container>
      <Portal>
        <Box style={{ width: 'max-content', position: 'absolute', right: '32px', bottom: '32px' }}>
          <UploadButton onClick={handleUploadButtonClick} position="absolute" />
        </Box>
      </Portal>
      <Box mb={3}>
        <Text textStyle="title">Files</Text>
      </Box>
      <Box my={3} alignItems="center">
        <SearchInput
          width="100%"
          placeholder="Search..."
          onChange={(e) => setSearchString(e.target.value)}
        />
        <Button
          variant="primaryInverted"
          height="42px"
          width="120px"
          ml={2}
          onClick={handleToggleSelectionButtonClick}
        >
          {isSelecting ? 'Cancel' : 'Select'}
        </Button>
        {isSelecting && (
          <Button
            variant="danger"
            height="42px"
            width="120px"
            ml={2}
            onClick={handlDeleteFilesButtonClick}
          >
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
        <Tree
          nodes={tree}
          isSelecting={isSelecting}
          onNodeClick={handleTreeNodeClick}
          onNodeSelect={handleTreeNodeSelect}
          onNodeDeselect={handleTreeNodeDeselect}
        />
      </Box>
    </Container>
  )
}

export default FilesView
