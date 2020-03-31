import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const wpdata = useStaticQuery(graphql`
    query Races {
      allWordpressAcfRace {
        nodes {
          acf {
            title
            raceid
            race_datetime
          }
        }
      }
    }
  `)

  const races = wpdata.allWordpressAcfRace.nodes
  console.log(races)
  return (
    <Layout>
      <SEO title="Home" />
      Index page.
      {races.map(race => {
        race = race.acf
        return (
          <div key={race.raceid}>
            {race.title} - {race.race_datetime}
            <Link to={`/races/${race.raceid}`}>Link to one race</Link>
          </div>
        )
      })}
    </Layout>
  )
}

export default IndexPage
