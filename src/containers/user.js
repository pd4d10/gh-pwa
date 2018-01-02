import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import { List, ListItem } from 'material-ui/List'
import { Repo } from '../icons'
import { colors } from '../constants'

const CountItem = ({ count, name, login }) => (
  <Link
    to={`/user/${login}/${name.toLowerCase()}`}
    style={{ flex: 1, textAlign: 'center' }}
  >
    <div style={{ color: colors.primary, fontSize: 14 }}>{count}</div>
    <div style={{ color: colors.grey }}>{name}</div>
  </Link>
)

const User = ({ data: { user } }) => (
  <div style={{ padding: 12 }}>
    <Avatar src={user.avatarUrl} />
    <div
      style={{
        display: 'flex',
        fontSize: 12,
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <CountItem
        count={user.repositories.totalCount}
        name="Repositories"
        login={user.login}
      />
      <CountItem
        count={user.starredRepositories.totalCount}
        name="Stars"
        login={user.login}
      />
      <CountItem
        count={user.followers.totalCount}
        name="Followers"
        login={user.login}
      />
      <CountItem
        count={user.following.totalCount}
        name="Following"
        login={user.login}
      />
    </div>
    <List>
      {user.pinnedRepositories.nodes.map(node => (
        <Link to={`/repository/${node.nameWithOwner}`} key={node.nameWithOwner}>
          <ListItem>
            <Repo />
            {node.nameWithOwner}
            {node.stargazers.totalCount}
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
)

const QUERY = gql`
  query($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      bioHTML
      companyHTML
      location
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
      pinnedRepositories(first: 6) {
        nodes {
          nameWithOwner
          stargazers {
            totalCount
          }
        }
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
