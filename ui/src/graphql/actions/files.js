import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const GET_FILES = gql`
  query getFiles {
    result: files @rest(type: "Page", path: "filesystem/") {
      items @type(name: "File") {
        path
        size
        extension
        isDir
        isHidden
        modifiedAt
      }
    }
  }
`
