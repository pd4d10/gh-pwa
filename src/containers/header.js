import React from 'react'
import MUIAppBar from 'material-ui/AppBar'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import styled from 'styled-components'

const Nav = p => (
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
    // onLeftIconButtonTouchTap={e => {
    //   e.preventDefault()
    //   if (p.isListPage) {
    //     // https://github.com/callemall/material-ui/issues/5070#issuecomment-244127708
    //     p.dispatch(drawerActions.show())
    //   } else if (p.history.length === 1) {
    //     // If no history, go to list page
    //     p.history.push('/')
    //   } else {
    //     p.history.goBack()
    //   }
    // }}
  />
)

const Wrapper = styled(Nav)``

export default withRouter(Wrapper)
