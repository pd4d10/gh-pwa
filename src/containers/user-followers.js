import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import { loadingEnhancer } from '../components/loading'
import { UserItem } from '../components/user-item'
import compose from 'recompose/compose'

const UserFollowers = ({ data: { user } }) => (
  <div>{user.followers.nodes.map(follower => <UserItem {...follower} />)}</div>
)

const query = gql`
  query($login: String!) {
    user(login: $login) {
      followers(first: 20) {
        nodes {
          login
          name
          avatarUrl
          location
        }
      }
    }
  }
`

export default compose(
  withRouter,
  graphql(query, {
    options: ({ match }) => ({
      variables: { login: match.params.login },
    }),
  }),
  loadingEnhancer
)(UserFollowers)
