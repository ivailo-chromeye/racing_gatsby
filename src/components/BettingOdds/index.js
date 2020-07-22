import React from "react"
import Layout from "../layout";
import s from "./style.module.css";
import RacesList from './RacesList';
import OddsComparison from '../OddsComparison';
import SectionTitle from '../SectionTitle'

const BettingOdds = ({ pageContext, location }) => {
  const { racesMenu, flatRaces, bookies } = pageContext

  return (
    <Layout>
      <SectionTitle title="Royal Ascot Odds Comparison" />
      <OddsComparison bookies={bookies} flatRaces={flatRaces} />
      <RacesList 
        racesMenu={racesMenu}
      />
    </Layout>
  )
}

export default BettingOdds
