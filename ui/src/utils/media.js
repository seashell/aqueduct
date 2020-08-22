import { css } from 'styled-components'

export default props => {
  const queries = props.theme.mediaQueries
  const x = Object.keys(queries).reduce((acc, label) => {
    acc[label] = (...args) => css`
      ${queries[label]} {
        ${css(...args)};
      }
    `
    return acc
  }, {})
}
