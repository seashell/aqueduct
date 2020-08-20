import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'

import HomeView from '_views/home'
import NotFound from '_views/not-found'
import NetworksRouter from '_views/networks'
import ActionsRouter from '_views/actions'
import ConsoleRouter from '_views/console'
import ProvisioningRouter from '_views/files'
import SystemRouter from '_views/system'

import { Bars as Spinner } from '_components/spinner'

import Header from '_containers/header'
import SideNav from '_containers/side-nav'

import ConfirmationDialogProvider from '_components/confirmation-dialog'
import DownloadProvider from '_utils/download-provider'

const Dashboard = styled.div`
  position: relative;
  display: grid;
  height: 100vh;

  grid-template: 72px auto / auto;
  grid-template-areas:
    'header'
    'body';

  // Laptops and above
  @media (min-width: 1280px) {
    grid-template: 72px auto / 260px auto;
    grid-template-areas:
      'header header'
      'sidenav body';
  }
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
          <SideNav />
          <Content>
            <HomeView path="/" />
            <NetworksRouter path="/networks/*" />
            <SystemRouter path="/info/*" />
            <ActionsRouter path="/actions/*" />
            <ConsoleRouter path="/console/*" />
            <ProvisioningRouter path="/files/*" />
            <NotFound default />
          </Content>
        </Dashboard>
      </DownloadProvider>
    </ConfirmationDialogProvider>
  )
}

export default App
