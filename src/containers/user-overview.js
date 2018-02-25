import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem } from 'material-ui/List'
import { Repo } from '../icons'
import { colors } from '../constants'

const UserOverview = ({ data: { user } }) => (
  <div>
    <Avatar src={user.avatarUrl} />
    <List>
      {user.pinnedRepositories.nodes.map(node => (
        <Link to={`/repo/${node.nameWithOwner}`} key={node.nameWithOwner}>
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
)(UserOverview)
