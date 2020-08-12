/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

import { useAuth0 } from '_utils/auth0'

const protectRoute = WrappedComponent => {
  const ProtectedRoute = ({ location, ...props }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

    useEffect(() => {
      if (loading || isAuthenticated) {
        return
      }
      const fn = async () => {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname },
        })
      }
      fn()
    }, [loading, isAuthenticated, loginWithRedirect, location])

    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }

  ProtectedRoute.propTypes = {}
  return ProtectedRoute
}

export default protectRoute
