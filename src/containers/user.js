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
import withState from 'recompose/withState'
import SwipeableViews from 'react-swipeable-views'
import UserRepositories from './user-repositories'
import UserOverview from './user-overview'
import UserStars from './user-stars'
import UserFollowers from './user-followers'
import UserFollowing from './user-following'
import withStyles from 'material-ui/styles/withStyles'

// const CountItem = ({ count, name, login }) => (
//   <Link
//     to={`/user/${login}/${name.toLowerCase()}`}
//     style={{ flex: 1, textAlign: 'center' }}
//   >
//     <div style={{ color: colors.primary, fontSize: 14 }}>{count}</div>
//     <div style={{ color: colors.grey }}>{name}</div>
//   </Link>
// )

// const getTab = location => {
//   const params = new URLSearchParams(location.search)
//   return params.get('tab')
// }

const tabs = ['Overview', 'Repositories', 'Stars', 'Followers', 'Following']

const User = ({ data: { user }, activeTab, setActiveTab }) => (
  <div>
    <Tabs
      classes={
        {
          // flexContainer: props.classes.tabs,
        }
      }
      value={activeTab}
      onChange={(event, value) => setActiveTab(() => value)}
      indicatorColor="primary"
      textColor="primary"
      scrollable
      scrollButtons="auto"
    >
      {tabs.map((label, i) => <Tab label={label} key={label} />)}
    </Tabs>
    <div>
      <SwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        axis="x"
        index={activeTab}
        onChangeIndex={index => setActiveTab(() => index)}
      >
        <div>
          {activeTab === 0 && <UserOverview />}
          {activeTab === 1 && <UserRepositories />}
          {activeTab === 2 && <UserStars />}
          {activeTab === 3 && <UserFollowers />}
          {activeTab === 4 && <UserFollowing />}
        </div>
      </SwipeableViews>
    </div>
    {/* <div
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
    </div> */}
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
  loadingEnhancer,
  withState('activeTab', 'setActiveTab', 1),
  withStyles({
    tabs: { paddingLeft: 30 },
  })
)(User)
