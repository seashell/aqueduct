import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { useFormik } from 'formik'
import * as _ from 'lodash'
import * as Yup from 'yup'

import Box from '_components/box'
import Text from '_components/text'
import Link from '_components/link'
import Button from '_components/button'
import toast from '_components/toast'
import TextInput from '_components/inputs/text-input'
import { useConfirmationDialog } from '_components/confirmation-dialog'

const Container = styled(Box)`
  flex-direction: column;
`

export const StyledButton = styled(Button)``

const ConnectionSetupView = ({ ssid }) => {
  const { confirm } = useConfirmationDialog()

  const formik = useFormik({
    initialValues: {
      ssid,
      password: '',
    },
    validationSchema: Yup.object().shape({
      ssid: Yup.string().required().nullable(),
      password: Yup.string().required(),
    }),
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const handleSaveButtonClick = () => {
    formik.validateForm().then((errors) => {
      if (_.isEmpty(errors)) {
        confirm({
          title: 'Confirm this operation',
          details: 'Are you sure you want to save this network configuration?',
          isDestructive: false,
          onConfirm: () => {
            // saveNetwork({ variables: { ...formik.values } })
          },
          onCancel: () => {},
        })
      } else {
        toast.error(Object.values(errors)[0])
      }
    })
  }

  return (
    <Container>
      <Box mb={3}>
        <Text textStyle="title">Configure {ssid}</Text>
      </Box>
      <Box flexDirection="column">
        <form>
          <Text textStyle="body" my={3} width="100%">
            SSID
          </Text>
          <TextInput
            name="ssid"
            {...formik.getFieldProps('ssid')}
            placeholder="Enter SSID"
            disabled
            mb={2}
          />

          <Text textStyle="body" my={3} width="100%">
            Password
          </Text>
          <TextInput
            name="password"
            type="password"
            {...formik.getFieldProps('password')}
            placeholder="Enter password"
            mb={2}
          />

          <Box mt={3} flexDirection="column" alignItems="center">
            <Button variant="primary" mt={4} mb={3} onClick={handleSaveButtonClick} width="120px">
              Save
            </Button>
            <Link to="/ui/networks">Cancel</Link>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

ConnectionSetupView.propTypes = {
  ssid: PropTypes.string,
}

ConnectionSetupView.defaultProps = {
  ssid: undefined,
}

export default ConnectionSetupView
