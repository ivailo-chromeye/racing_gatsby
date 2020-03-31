import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PageHeadlineComponent from "../components/pageHeadline"

const Homepage = () => {
  const pageData = useStaticQuery(graphql`
    query MyQuery {
      wordpressPage(wordpress_id: { eq: 290 }) {
        id
        slug
        title
        wordpress_id
        acf {
          title
          subtitle
        }
      }
    }
  `)

  const pageTitle = pageData.wordpressPage.acf.title
  const pageSubtitle = pageData.wordpressPage.acf.subtitle

  return (
    <Layout>
      <SEO title="Home" />
      <PageHeadlineComponent title={pageTitle} subtitle={pageSubtitle} />
    </Layout>
  )
}

export default Homepage
