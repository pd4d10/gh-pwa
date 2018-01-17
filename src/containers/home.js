import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import { connect } from '../utils'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem } from 'material-ui/List'

const EventComponent = p => {
  switch (p.type) {
    case 'PushEvent':
      return (
        <div>
          <Link to={`/user/${p.actor.login}`}>{p.actor.login}</Link>
          pushed to
          <Link to={`/repository/${p.repo.name}`}>{p.payload.ref}</Link>
          in
          <Link to={`/repository/${p.repo.name}`}>{p.repo.name}</Link>
          <div>
            {p.payload.commits.map(commit => (
              <span>
                {commit.sha.slice(0, 7)}
                {commit.message}
              </span>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}

const Home = ({ data: { payload } }) => (
  <div>
    <ul>
      {payload.map(item => (
        <li key={item.id}>
          <Avatar src={item.actor.avatar_url} />
          <EventComponent {...item} />
        </li>
      ))}
    </ul>
  </div>
)

export default compose(
  withRouter,
  connect('/users/pd4d10/received_events/public'),
  loadingEnhancer
)(Home)
