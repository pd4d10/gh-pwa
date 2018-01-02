import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'

const User = ({ data }) => (
  <div>
    <Avatar src={data.user.avatarUrl} />
    <div>
      Followers:
      <Link to={`/user/${data.user.login}/followers`}>
        {data.user.followers.totalCount}
      </Link>
    </div>
    <div>
      Repos:
      <Link to={`/user/${data.user.login}/repositories`}>
        {data.user.repositories.totalCount}
      </Link>
    </div>
  </div>
)

const QUERY = gql`
  query($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      starredRepositories {
        totalCount
      }
      repositories {
        totalCount
      }
      following {
        totalCount
      }
      followers {
        totalCount
      }
    }
  }
`

export default compose(
  withRouter,
  graphql(QUERY, {
    options: ({ match }) => ({
      variables: { login: match.params.login },
    }),
  }),
  loadingEnhancer
)(User)
