import React from 'react'
import { Star, Fork, Repo } from '../icons'
import { colors } from '../constants'
import ListItem from 'material-ui/List/ListItem'
import { Link } from 'react-router-dom'

const paragraphStyle = {
  marginTop: 8,
  fontSize: 14,
}

export const Repositories = ({ repositories, login }) => (
  <div>
    {repositories.nodes.map(repo => (
      <Link to={`/repository/${repo.owner.login}/${repo.name}`}>
        <ListItem
          innerDivStyle={{
            display: 'flex',
            padding: '12px',
            borderBottom: '1px solid #eee',
          }}
        >
          <div style={{ flexBasis: 20 }}>
            {repo.isFork ? <Fork /> : <Repo />}
          </div>
          <div>
            <h3
              style={{
                color: colors.link,
                fontSize: 16,
              }}
            >
              {login}/<strong style={{ fontWeight: 600 }}>{repo.name}</strong>
            </h3>
            <p style={paragraphStyle}>{repo.description}</p>
            <p style={{ ...paragraphStyle, fontSize: 12, color: colors.grey }}>
              <Star /> {repo.stargazers.totalCount}
              {'  '}
              <Fork /> {repo.forks.totalCount}
            </p>
          </div>
        </ListItem>
      </Link>
    ))}
  </div>
)
