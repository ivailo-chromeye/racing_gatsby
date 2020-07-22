import React, { useState } from "react"
import Layout from "../layout"
import RaceInfo from "../SingleRace/RaceInfo"
import RaceControls from "../SingleRace/RaceControls"
import Odds from "../OddsComparison/Odds"
import BookiesList from "../OddsComparison/BookiesList";
import oddsStyle from "../OddsComparison/style.module.css"

const SingleRaceOdds = ({ pageContext, location }) => {
  const { richFeed, raceDate, raceTime, raceid, bookies } = pageContext

  console.log(richFeed)

  return (
    <Layout>
      <RaceInfo
        title={richFeed.race_instance_title}
        distance_yard={richFeed.distance_yard}
        race_class={richFeed.race_class}
        rp_ages_allowed_desc={richFeed.rp_ages_allowed_desc}
        raceDate={raceDate}
        raceTime={raceTime}
        winner={richFeed.prizes[0]["prize_sterling"]}
        no_of_runners={richFeed.API_runners.length}
      />
      <RaceControls />
      <div className={oddsStyle.odds_comparison}>
        <BookiesList bookies={bookies} />
        <Odds bookies={bookies} race={richFeed} />
      </div>
      
    </Layout>
  )
}

export default SingleRaceOdds
