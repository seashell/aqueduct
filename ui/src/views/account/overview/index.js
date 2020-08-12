import React from 'react'

import { useAuth0 } from '_utils/auth0'

import Moment from 'react-moment'
import Box from '_components/box'
import Text from '_components/text'
import Avatar from '_components/avatar'
import Button from '_components/button'
import { Jellyfish as Spinner } from '_components/spinner'

const Overview = () => {
  const { user, loading: isLoading } = useAuth0()

  if (isLoading) return <Spinner />

  return (
    <Box type="grid-12">
      <Box type="padded" gridColumn="span 12" alignItems="center" border="discrete">
        <Avatar size={172} mr={3} name={user.name} src={user.gravatar || null} />
        <Box flexDirection="column">
          <Text textStyle="subtitle">{user.name}</Text>
          <Text textStyle="body" my={2}>
            {user.email}
          </Text>
          <Text textStyle="body">
            Member since <Moment format="D MMM YYYY">{user.createdAt}</Moment>
          </Text>
        </Box>
      </Box>

      <Box my={3} gridColumn="span 12" justifyContent="space-between">
        <Box flexDirection="column">
          <Text textStyle="heading" mb={3}>
            Deactivate account
          </Text>
          <Text textStyle="body">
            This will remove your account from all organizations and projects.
          </Text>
        </Box>
        <Button
          disabled
          variant="dangerInverted"
          width="180px"
          borderRadius={3}
          justifySelf="flex-end"
        >
          Deactivate Account
        </Button>
      </Box>
    </Box>
  )
}
export default Overview
