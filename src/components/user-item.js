import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from './avatar'
import ListItem from 'material-ui/List/ListItem'
import { colors } from '../constants'

// const StyledListItem = styled(ListItem)`
//   display: flex;
//   padding: 12px;
//   &:not(:first-of-type) {
//     border-top: 1px solid ${colors.border};
//   }
// `

export const UserItem = p => (
  <Link to={`/user/${p.login}`}>
    <ListItem innerDivStyle={{ display: 'flex', padding: '12px' }}>
      <Avatar
        src={p.avatarUrl}
        style={{
          flexBasis: 48,
          height: 48,
          marginRight: 10,
        }}
      />
      <div
        style={{
          color: colors.link,
          marginRight: 4,
        }}
      >
        {p.name}
      </div>
      <div style={{ color: colors.text }}>{p.login}</div>
    </ListItem>
  </Link>
)
