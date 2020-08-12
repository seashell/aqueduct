import React from 'react'

import { Redirect } from '@reach/router'

const HomeView = () => <Redirect noThrow from="/" to="/networks" />

export default HomeView
