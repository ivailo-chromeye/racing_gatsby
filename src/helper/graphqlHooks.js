import {useStaticQuery, graphql} from 'gatsby';

export const liveBlog = () => useStaticQuery(graphql`
{
  wordpressAcfOptions {
    options {
      intervalseconds
      useinterval
      per_page
    }
  }
  allWordpressWpItem(sort: {order: DESC, fields: date}, limit:20) {
    nodes {
      acf {
        title
        text
      }
      wordpress_id
      date(fromNow: true)
    }
    totalCount
  }
}
`)