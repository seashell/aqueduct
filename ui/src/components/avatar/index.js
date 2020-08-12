/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { layout, space, color, border } from 'styled-system'

import ReactAvatar, { ConfigProvider } from 'react-avatar'

const StyledReactAvatar = styled(ReactAvatar)`
  ${layout}
  ${space}
  ${color}
  ${border}
`

const Avatar = props => (
  <ConfigProvider colors={['#00c582', '#c66ce0', '#43d1ff', '#8b74ff', '#ff824c']}>
    <StyledReactAvatar size="40" maxInitials={1} textSizeRatio={2.5} round {...props} />
  </ConfigProvider>
)

export default Avatar
