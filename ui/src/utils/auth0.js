/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [auth0Client, setAuth0Client] = useState()

  const [isAuthenticated, setIsAuthenticated] = useState()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0Client(auth0FromHook)

      // User is being redirected from Auth0
      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }
      setLoading(false)
    }
    initAuth0()
  }, [])

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(auth0Client.isAuthenticated)
    setUser(user)
  }

  return (
    <Auth0Context.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout({ returnTo: window.location.origin }, ...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
