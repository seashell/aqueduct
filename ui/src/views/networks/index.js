import React from 'react'
import { Router } from '@reach/router'

import List from './list'
import Connect from './connect'

const NetworksRouter = () => (
  <Router>
    <List path="/" />
    <Connect path="/:ssid/connect" />
  </Router>
)

export default NetworksRouter
