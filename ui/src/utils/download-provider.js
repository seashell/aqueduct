import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'
import * as StreamSaver from 'streamsaver'
import { saveAs } from 'file-saver'

const DownloadContext = React.createContext()

export const useDownload = () => useContext(DownloadContext)

const DownloadProvider = ({ children }) => {
  const ref = useRef(null)

  const download = (filename, content, onSuccess, onError) => {
    const fileStream = StreamSaver.createWriteStream(filename, {
      writableStrategy: undefined,
      readableStrategy: undefined,
    })
    new Response(content).body.pipeTo(fileStream).then(
      () => {
        onSuccess()
      },
      () => {
        onError()
      }
    )
  }

  const downloadUrl = (url, filename) => {
    saveAs(url, filename)
  }

  return (
    <>
      <DownloadContext.Provider
        value={{
          download: (filename, content, onSuccess, onError) => {
            if (onSuccess === undefined) {
              onSuccess = () => {}
            }
            if (onError === undefined) {
              onError = () => {}
            }
            download(filename, content, onSuccess, onError)
          },
          downloadUrl: (url, filename) => {
            downloadUrl(url, filename)
          },
        }}
      >
        {children}
      </DownloadContext.Provider>
      <Portal>
        <a download ref={ref} style={{ display: 'none' }}>
          Download
        </a>
      </Portal>
    </>
  )
}

DownloadProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DownloadProvider
