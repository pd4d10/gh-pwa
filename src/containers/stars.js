import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { loadingEnhancer } from '../components/loading'
import compose from 'recompose/compose'
import { Repositories } from '../components/repositories'

const query = gql`
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      starredRepositories(
        first: 20
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        nodes {
          name
          owner {
            login
          }
          description
          isFork
          primaryLanguage {
            color
            name
          }
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
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
)(({ data: { user } }) => (
  <Repositories repositories={user.starredRepositories} login={user.login} />
))
