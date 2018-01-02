import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import styled from 'styled-components'
import { Star, Fork } from '../icons'
import { colors } from '../constants'
import compose from 'recompose/compose'
// import ListItem from 'material-ui/List/ListItem'
// import { UserItem } from '../components/user-item'

const query = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      owner {
        login
      }
    }
  }
`

const Repository = ({ data }) => <div>{data.repository.name}</div>

export default compose(
  withRouter,
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        name: match.params.name,
        owner: match.params.owner,
      },
    }),
  }),
  loadingEnhancer
)(Repository)
