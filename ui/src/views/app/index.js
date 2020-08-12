import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'

import HomeView from '_views/home'
import NotFound from '_views/not-found'
import NetworksRouter from '_views/networks'
import ActionsRouter from '_views/actions'
import ProvisioningRouter from '_views/provision'
import SystemRouter from '_views/system'

import { Jellyfish as Spinner } from '_components/spinner'

import Header from '_containers/header'
import Footer from '_containers/footer'

import ConfirmationDialogProvider from '_components/confirmation-dialog'
import DownloadProvider from '_utils/download-provider'

const Dashboard = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template: 72px auto 40px / 0px auto;
  grid-template-areas:
    'sidenav header'
    'sidenav body'
    'sidenav footer';
`

const Content = styled(Router).attrs({ primary: false })`
  position: relative;
  padding-top: 64px;
  padding-bottom: 32px;
  grid-area: body;
  width: 90%;
  max-width: 800px;
  justify-self: center;
`

const App = () => {
  useEffect(() => {}, [])

  const isLoading = false

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ConfirmationDialogProvider>
      <DownloadProvider>
        <Dashboard>
          <Header />
          <Content>
            <HomeView path="/" />
            <NetworksRouter path="/networks/*" />
            <SystemRouter path="/system/*" />
            <ActionsRouter path="/actions/*" />
            <ProvisioningRouter path="/provisioning/*" />
            <NotFound default />
          </Content>
          <Footer gridArea="footer" />
        </Dashboard>
      </DownloadProvider>
    </ConfirmationDialogProvider>
  )
}

export default App
