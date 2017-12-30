import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from './avatar'
import styled from 'styled-components'
import ListItem from 'material-ui/List/ListItem'
import { colors } from '../constants'

const StyledListItem = styled(ListItem)`
  display: flex;
  padding: 12px;
  &:not(:first-of-type) {
    border-top: 1px solid ${colors.border};
  }
`

const StyledAvatar = styled(Avatar)`
  flex-basis: 48px;
  height: 48px;
  margin-right: 10px;
`

const Name = styled.div`
  color: ${colors.link};
  margin-right: 4px;
`

const Login = styled.div`
  color: ${colors.text};
`

export const UserItem = p => (
  <Link to={`/user/${p.login}`}>
    <ListItem innerDivStyle={{ display: 'flex', padding: '12px' }}>
      <StyledAvatar src={p.avatarUrl} />
      <Name>{p.name}</Name>
      <Login>{p.login}</Login>
    </ListItem>
  </Link>
)
