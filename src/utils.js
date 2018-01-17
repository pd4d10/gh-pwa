import React from 'react'
import lifecycle from 'recompose/lifecycle'
import { token } from './token'

export const connect = (api, opts = {}) =>
  lifecycle({
    state: {
      data: {
        loading: true,
      },
      error: false,
    },
    async componentDidMount() {
      try {
        const res = await fetch('https://api.github.com' + api, {
          ...opts,
          headers: {
            Authorization: `token ${token}`,
          },
        })
        const payload = await res.json()
        this.setState({ data: { loading: false, payload } })
      } catch (err) {
        this.setState({
          error: err.message,
        })
      } finally {
        // this.setState(s => ({
        //   ...s,
        //   data: { ...s.data, loading: false },
        // }))
      }
    },
  })
