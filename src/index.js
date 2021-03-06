import React from 'react'
import ReactDOM from 'react-dom'
// import 'normalize.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Header from './containers/header'
import { token } from './token'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import User from './containers/user'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
// import UserFollowers from './containers/followers'
import { colors } from './constants'
import NotFound from './components/not-found'
import Home from './containers/home'
import About from './containers/about'
import Settings from './containers/settings'
// import Following from './containers/following'
// import Repositories from './containers/repositories'
import Repository from './containers/repository'
import grey from 'material-ui/colors/grey'
// import Stars from './containers/stars'

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

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: colors.text,
  //   }
  // },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div>
          <Header />
          <div style={{ marginTop: 56 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/repo/:owner/:name" component={Repository} />
              {/* <Route path="/user/:login/stars" component={Stars} />
              <Route
                path="/user/:login/repositories"
                component={Repositories}
              />
              <Route path="/user/:login/followers" component={Followers} />
              <Route path="/user/:login/following" component={Following} /> */}
              <Route path="/user/:login" component={User} />
              <Route path="/settings" component={Settings} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
