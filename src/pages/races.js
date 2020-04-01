/*eslint-disable*/
import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql, Link } from "gatsby"

const Races = () => {

  const races = (useStaticQuery(graphql`
    {
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
  `)).allWordpressAcfRace.nodes;

  console.log(races);

  return (
    <Layout>
      races page
    </Layout>
  )
}

export default Races;