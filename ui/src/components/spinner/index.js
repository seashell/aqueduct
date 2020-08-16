import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

import Jellyfish from './jellyfish'
import Dragon from './dragon'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  align-items: center;
  justify-items: center;
`

const Grid = () => (
  <Overlay>
    <Loader type="Puff" color="#eee" height={60} width={60} />
  </Overlay>
)

const Bars = () => (
  <Overlay>
    <Loader type="Bars" color="#eee" height={60} width={60} />
  </Overlay>
)

export { Dragon, Jellyfish, Grid, Bars }
