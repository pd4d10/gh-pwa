import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import { connect } from '../utils'
import { colors } from '../constants'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem } from 'material-ui/List'

const Strong = props => (
  <span {...props} style={{ fontWeight: 600, color: colors.text }} />
)

const EventComponent = p => {
  switch (p.type) {
    case 'PushEvent':
      return (
        <Link to={`/repo/${p.repo.name}`}>
          <Strong>{p.actor.login}</Strong> pushed to{' '}
          <span
            style={{
              color: colors.link,
              // backgroundColor: colors.backgroundBlue,
            }}
          >
            {p.payload.ref}
          </span>{' '}
          in <Strong>{p.repo.name}</Strong>
          {p.payload.commits.map(commit => (
            <div key={commit.sha}>
              <span style={{ color: colors.link, fontFamily: 'monospace' }}>
                {commit.sha.slice(0, 7)}
              </span>{' '}
              {commit.message}
            </div>
          ))}
        </Link>
      )
    case 'PullRequestEvent':
      return (
        <Link to={`/repo/${p.repo.name}`}>
          <Strong>{p.actor.login}</Strong> {p.payload.action} pull request{' '}
          <Strong>{p.repo.name}</Strong>
          <Strong>#{p.payload.number}</Strong>
          <div>{p.payload.pull_request.title}</div>
        </Link>
      )
    case 'IssuesEvent':
      return (
        <Link to={`/repo/${p.repo.name}/issue/${p.id}`}>
          <Strong>{p.actor.login}</Strong> {p.payload.action} issue{' '}
          <Strong>{p.repo.name}</Strong>
          <Strong>#{p.payload.issue.number}</Strong>
          <div>{p.payload.issue.title}</div>
        </Link>
      )
    case 'IssueCommentEvent':
      return (
        <Link to={`/repo/${p.repo.name}/issue/${p.id}`}>
          <Strong>{p.actor.login}</Strong> commented on issue{' '}
          <Strong>{p.repo.name}</Strong>
          <Strong>#{p.payload.issue.number}</Strong>
          <div>{p.payload.comment.body}</div>
        </Link>
      )
    default:
      return null
  }
}

const Home = ({ data: { payload } }) => (
  <div style={{ fontSize: 14, wordWrap: 'break-word', wordBreak: 'break-all' }}>
    <List>
      {payload.map(item => (
        <ListItem
          key={item.id}
          style={{ padding: 8, alignItems: 'flex-start' }}
        >
          <Link to={`/user/${item.actor.login}`}>
            <Avatar style={{ marginRight: 8 }} src={item.actor.avatar_url} />
          </Link>
          <EventComponent {...item} />
        </ListItem>
      ))}
    </List>
  </div>
)

export default compose(
  withRouter,
  connect('/users/pd4d10/received_events/public'),
  loadingEnhancer
)(Home)
