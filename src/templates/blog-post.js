import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const Template = ({ data, location, pathContext }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { title, date } = frontmatter
  const { prev, next } = pathContext

  return (
    <div>
      <Helmet title={`${title} - My blog`} />

      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        <p>
          {prev && (
            <Link to={prev.frontmatter.path}>
              Previous: {prev.frontmatter.title}
            </Link>
          )}
        </p>
        <p>
          {next && (
            <Link to={next.frontmatter.path}>
              Next: {next.frontmatter.title}
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template
