import React from "react"
import s from "./style.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../layout"

const Guide = props => {
  const { allWordpressPage: page } = useStaticQuery(graphql`
    {
      allWordpressPage(filter: { wordpress_id: { eq: 307 } }) {
        nodes {
          acf {
            copy_sections {
              text
              title
            }
          }
          slug
          wordpress_id
        }
      }
    }
  `)

  const { copy_sections } = page.nodes[0].acf

  return (
    <Layout>
      <div className="container">
        <div className={s.fb_adsec_copy}>
          {copy_sections.map(({text, title}) => {
            return <div className={s.copy_sec} key={title}>
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{__html:text}}>

              </div>
            </div>
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Guide
