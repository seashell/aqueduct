import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Box from '_components/box'
import Text from '_components/text'
import { XTerm } from 'xterm-for-react'
import { SearchAddon } from 'xterm-addon-search'
import { SearchBarAddon } from 'xterm-addon-search-bar'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { Unicode11Addon } from 'xterm-addon-unicode11'
import { AttachAddon } from 'xterm-addon-attach'

const Container = styled(Box)`
  flex-direction: column;
`

const ConsoleView = () => {
  const [input, setInput] = useState('')
  const xtermRef = React.useRef(null)

  const ws = new WebSocket(`ws://${window.location.hostname}:9090/ws/console/`, 'control')

  const attachAddon = new AttachAddon(ws)
  const searchAddon = new SearchAddon()
  const searchBarAddon = new SearchBarAddon()
  const webLinksAddon = new WebLinksAddon()
  const unicodeAddon = new Unicode11Addon()

  ws.onmessage = (msg) => {
    if (msg.data === 'ping') {
      ws.send('pong')
    } else {
      // xtermRef.current.terminal.write(msg.data)
    }
  }

  ws.onerror = (error) => {
    console.log(error)
  }

  useEffect(() => {}, [])

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Console</Text>
      </Box>
      <Box>
        <XTerm
          ref={xtermRef}
          addons={[attachAddon, searchAddon, webLinksAddon, unicodeAddon]}
          options={{
            cursorBlink: true,
            lineHeight: 1.6,
            theme: {
              background: '#fff',
              cursor: '#333',
              cursorAccent: '#f00',
              foreground: '#222',
              selection: '#00a1ff',
            },
          }}
        />
      </Box>
    </Container>
  )
}

export default ConsoleView
