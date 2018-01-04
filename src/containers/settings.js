import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import Switch from 'material-ui/Switch'

import Tabs, { Tab } from 'material-ui/Tabs'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List'

const Settings = () => (
  <div>
    <List>
      <ListItem>
        <ListItemText primary="Languages" />
        <ListItemSecondaryAction>
          <Switch onChange={() => {}} checked={false} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </div>
)

// const QUERY = gql``

export default compose(
  withRouter
  // graphql(QUERY, {
  //   options: ({ match }) => ({
  //     variables: { login: match.params.login },
  //   }),
  // }),
  // loadingEnhancer,
  // withState('abc', 'setActiveTab', 1),
  // withStyles({
  //   tabs: { paddingLeft: 30 },
  // })
)(Settings)
