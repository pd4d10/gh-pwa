import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading from '../components/loading'
import styled from 'styled-components'
import { UserItem } from '../components/user-item'

export const Following = withRouter(
  graphql(
    gql`
      query($login: String!) {
        user(login: $login) {
          following(first: 20) {
            nodes {
              login
              name
              avatarUrl
              location
            }
          }
        }
      }
    `,
    {
      options: ({ match }) => ({
        variables: { login: match.params.login },
      }),
    }
  )(
    ({ data }) =>
      data.loading ? (
        <Loading />
      ) : (
        <div>
          {data.user.following.nodes.map(follower => (
            <UserItem {...follower} />
          ))}
        </div>
      )
  )
)
