import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Header from './containers/header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { token } from './token'
import { Route, HashRouter, Switch } from 'react-router-dom'
import User from './containers/user'
import { Followers } from './containers/followers'
import { colors } from './constants'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import NotFound from './components/not-found'
import styled from 'styled-components'
import { Following } from './containers/following'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const muiTheme = getMuiTheme({
  appBar: {
    color: colors.primary,
  },
})

const Container = styled.div`
  margin-top: 56px;
  /* padding: 10px; */
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Header />
        <Container>
          <Switch>
            <Route path="/user/:login/followers" component={Followers} />
            <Route path="/user/:login/following" component={Following} />
            <Route path="/user/:login" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </MuiThemeProvider>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
