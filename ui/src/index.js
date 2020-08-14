import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import styled, { ThemeProvider } from 'styled-components'
import log from 'loglevel'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import ApolloProvider from '_graphql/apollo-provider'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'
import { ToastContainer } from '_components/toast'

import App from '_views/app'

import { themes, GlobalStyles } from './styles'
import * as serviceWorker from './serviceWorker'

import { REST_API_URL } from './environment'

const theme = 'light'

const ModalBackground = styled(BaseModalBackground)`
  z-index: 999;
`

const Root = () => {
  if (process.env.NODE_ENV !== 'production') {
    log.enableAll(false)
    log.debug('rest_api_url = ', REST_API_URL)
  }

  return (
    <ApolloProvider>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={themes[theme]}>
          <ModalProvider backgroundComponent={ModalBackground}>
            <GlobalStyles />
            <Router>
              <App path="/ui/*" />
            </Router>
            <ToastContainer />
          </ModalProvider>
        </ThemeProvider>
      </DndProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
