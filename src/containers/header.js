import React from 'react'
import Helmet from 'react-helmet'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Settings from 'material-ui-icons/Settings'
import Info from 'material-ui-icons/Info'
import Menu from 'material-ui-icons/Menu'
import withState from 'recompose/withState'
import compose from 'recompose/compose'

function getTitle(history) {
  history.path
}

const Header = props => (
  <div>
    {/* <Helmet>
      <title>abc</title>
    </Helmet> */}
    <AppBar
    // iconElementLeft={
    //   // Have to be a conditional operator instead of disjunction
    //   p.isListPage ? (
    //     undefined
    //   ) : (
    //     <IconButton>
    //       <ArrowBack />
    //     </IconButton>
    //   )
    // }
    // onLeftIconButtonClick={e => {
    //   // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
    //   e.preventDefault()
    //   p.setOpen(open => !open)

    //   // if (p.history.length === 1) {
    //   //   // If no history, go home
    //   //   p.history.push('/')
    //   // } else {
    //   //   p.history.goBack()
    //   // }
    // }}
    >
      <Toolbar>
        {props.location.pathname === '/' ? (
          <IconButton
            color="contrast"
            aria-label="Menu"
            onClick={() => props.setOpen(() => true)}
          >
            <Menu />
          </IconButton>
        ) : (
          <IconButton
            color="contrast"
            aria-label="Back"
            onClick={() => props.history.goBack()}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography color="inherit">{props.title}</Typography>
      </Toolbar>
    </AppBar>
    <Drawer open={props.open} onClose={() => props.setOpen(() => false)}>
      <List style={{ width: 220 }}>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  </div>
)

export default compose(withRouter, withState('open', 'setOpen', false))(Header)
