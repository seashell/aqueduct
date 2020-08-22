import React from 'react'
import { Router } from '@reach/router'

import General from './general'

const SystemRouter = () => (
  <Router>
    <General path="/" />
  </Router>
)

export default SystemRouter
