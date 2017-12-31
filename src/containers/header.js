import React from 'react'
import MUIAppBar from 'material-ui/AppBar'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import styled from 'styled-components'
import withState from 'recompose/withState'
import compose from 'recompose/compose'

const Header = p => (
  <div>
    <MUIAppBar
      style={{
        position: 'fixed',
        top: 0,
      }}
      iconStyleLeft={{
        width: '44px',
        height: '44px',
        marginTop: '4px',
      }}
      titleStyle={{
        fontSize: '22px',
        height: '56px',
        lineHeight: '56px',
      }}
      title={p.title}
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
      onLeftIconButtonClick={e => {
        // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
        e.preventDefault()
        p.setOpen(open => !open)

        // if (p.history.length === 1) {
        //   // If no history, go home
        //   p.history.push('/')
        // } else {
        //   p.history.goBack()
        // }
      }}
    />
    <Drawer
      docked={false}
      width={220}
      open={p.open}
      onRequestChange={() => p.setOpen(open => !open)}
    >
      <List>
        <Divider />
      </List>
    </Drawer>
  </div>
)

export default compose(withRouter, withState('open', 'setOpen', false))(Header)
