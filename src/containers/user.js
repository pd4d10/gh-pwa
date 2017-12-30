import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading from '../components/loading'
import { Avatar } from '../components/avatar'

const User = ({ data }) => {
  return (
    <div>
      {data.loading ? (
        <Loading />
      ) : (
        <div>
          <Avatar src={data.user.avatarUrl} />
          <div>
            <Link to={`/user/${data.user.login}/followers`}>
              {data.user.followers.totalCount}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

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

export default withRouter(
  graphql(QUERY, {
    options: ({ match }) => ({
      variables: { login: match.params.login },
    }),
  })(User)
)
