import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

export const Loading = () => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: -20,
      marginLeft: -20,
    }}
  >
    <CircularProgress />
  </div>
)

// https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
// export const LoadingWrapper = ({ data, children }) =>
//   data.loading ? (
//     <Container>
//       <CircularProgress />
//     </Container>
//   ) : (
//     React.cloneElement(children, { data })
//   )

export const loadingEnhancer = Component => {
  return props => (props.data.loading ? <Loading /> : <Component {...props} />)
}
