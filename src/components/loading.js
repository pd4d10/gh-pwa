import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
`

const Loading = () => (
  <Container>
    <CircularProgress />
  </Container>
)

export default Loading
