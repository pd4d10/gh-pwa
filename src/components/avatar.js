import React from 'react'

export const Avatar = props => (
  <img
    {...props}
    style={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      ...(props.style || {}),
    }}
  />
)
