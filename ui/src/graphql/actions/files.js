import gql from 'graphql-tag'

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
        url
      }
    }
  }
`

export const UPLOAD_FILE = gql`
  mutation uploadFile($input: File!) {
    uploadFile(input: $input)
    @rest(type: "File", path: "filesystem/", method: "POST", bodySerializer: "fileEncode") {
      error
    }
  }
`

export const DELETE_FILE = gql`
  mutation deleteFile($path: String!) {
    uploadFile(path: $path) @rest(type: "File", path: "filesystem/{args.path}", method: "DELETE") {
      error
    }
  }
`
