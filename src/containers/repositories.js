import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'
import Loading from '../components/loading'
import styled from 'styled-components'
import { Star, Fork } from '../icons'
import { colors } from '../constants'
import ListItem from 'material-ui/List/ListItem'
// import { UserItem } from '../components/user-item'

const Repo = styled.div`
  h3 {
    color: ${colors.link};
    font-size: 16px;
  }
  strong {
    font-weight: 600;
  }
  p {
    margin-top: 8px;
    font-size: 14px;
  }
`

export const Repositories = withRouter(
  graphql(
    gql`
      query($login: String!) {
        user(login: $login) {
          login
          avatarUrl
          repositories(
            first: 20
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              name
              owner {
                login
              }
              description
              isFork
              primaryLanguage {
                color
                name
              }
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
            }
          }
        }
      }
    `,
    {
      options: ({ match }) => ({
        variables: { login: match.params.login },
      }),
    }
  )(
    ({ data }) =>
      data.loading ? (
        <Loading />
      ) : (
        <div>
          {data.user.repositories.nodes.map(repo => (
            <Link to={`/repository/${repo.owner.login}/${repo.name}`}>
              <ListItem innerDivStyle={{ display: 'flex', padding: '12px' }}>
                <Repo>
                  <h3>
                    {data.user.login}/<strong>{repo.name}</strong>
                  </h3>
                  <p>{repo.description}</p>
                  <p style={{ fontSize: 12, color: colors.grey }}>
                    <Star /> {repo.stargazers.totalCount}
                    {'  '}
                    <Fork /> {repo.forks.totalCount}
                  </p>
                </Repo>
              </ListItem>
            </Link>
          ))}
        </div>
      )
  )
)
