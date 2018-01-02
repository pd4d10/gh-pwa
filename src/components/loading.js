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

// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
export const LoadingWrapper = ({ data, children }) =>
  data.loading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    React.cloneElement(children, { data })
  )

export const loadingEnhancer = Component => ({ data }) =>
  data.loading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    <Component data={data} />
  )
