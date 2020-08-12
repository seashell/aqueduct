import React from 'react'
import { Router } from '@reach/router'

import Details from './details'

const SystemRouter = () => (
  <Router>
    <Details path="/" />
  </Router>
)

export default SystemRouter
