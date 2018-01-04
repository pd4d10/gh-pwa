import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading, { loadingEnhancer } from '../components/loading'
import { Avatar } from '../components/avatar'
import compose from 'recompose/compose'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem } from 'material-ui/List'

const Home = () => 'Home'

// const QUERY = gql``

export default compose(
  withRouter
  // graphql(QUERY, {
  //   options: ({ match }) => ({
  //     variables: { login: match.params.login },
  //   }),
  // }),
  // loadingEnhancer,
  // withState('activeTab', 'setActiveTab', 1),
  // withStyles({
  //   tabs: { paddingLeft: 30 },
  // })
)(Home)
