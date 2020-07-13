import React from "react"
import Layout from "../layout";
import s from "./style.module.css";
import RacesList from './RacesList'

const BettingOdds = ({ pageContext, location }) => {
  const { racesMenu } = pageContext

  return (
    <Layout>
      <RacesList 
        racesMenu={racesMenu}
      />
      betting odds page
    </Layout>
  )
}

export default BettingOdds
