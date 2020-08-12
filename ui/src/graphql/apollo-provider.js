/* eslint-disable no-fallthrough */
import React from 'react'

import { ApolloProvider } from '@apollo/client'

import { ApolloClient } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { RestLink } from 'apollo-link-rest'
import { DedupLink } from 'apollo-link-dedup'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

import log from 'loglevel'

import { REST_API_URL } from '../environment'
import { defaults } from './local-state'

// eslint-disable-next-line react/prop-types
export const CustomApolloProvider = ({ children }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        log.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
    }
    if (networkError) {
      switch (networkError.statusCode) {
        case 401:
          log.error('[Apollo Provider] Unauthorized')
        default:
          log.error('[Apollo Provider] Network error: ', networkError)
      }
    }
  })

  const withToken = setContext(() => {})

  const withOrganizationID = setContext(() => {
    const oid = JSON.parse(localStorage.getItem('seashell.organizationId'))
    return new Promise(resolve => {
      resolve({ orgId: oid })
    })
  })

  const authLink = new ApolloLink((operation, forward) => {
    const { token, orgId } = operation.getContext()
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
        'Organization-ID': orgId,
      },
    }))
    return forward(operation)
  })

  const dedupLink = new DedupLink()

  const restLink = new RestLink({
    uri: REST_API_URL,
  })

  const cache = new InMemoryCache()
  cache.writeData(defaults)

  const client = new ApolloClient({
    link: ApolloLink.from([
      withToken,
      withOrganizationID,
      dedupLink,
      authLink,
      errorLink,
      restLink,
    ]),
    cache,
    typeDefs: {},
    connectToDevTools: true,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default CustomApolloProvider
