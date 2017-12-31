import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading from '../components/loading'
import styled from 'styled-components'
import { Star } from '../components/star'
import { Fork } from '../components/fork'
import { colors } from '../constants'
// import ListItem from 'material-ui/List/ListItem'
// import { UserItem } from '../components/user-item'

export const Repository = withRouter(
  graphql(
    gql`
      query($name: String!, $owner: String!) {
        repository(name: $name, owner: $owner) {
          id
          name
          owner {
            login
          }
        }
      }
    `,
    {
      options: ({ match }) => ({
        variables: {
          name: match.params.name,
          owner: match.params.owner,
        },
      }),
    }
  )(
    ({ data }) =>
      data.loading ? <Loading /> : <div>{data.repository.name}</div>
  )
)
