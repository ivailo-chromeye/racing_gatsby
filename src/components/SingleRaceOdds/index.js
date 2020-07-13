import React, { useState } from "react"
import Layout from "../layout"
import RaceInfo from "../SingleRace/RaceInfo"
import RaceControls from "../SingleRace/RaceControls"

const SingleRaceOdds = ({ pageContext, location }) => {
  const { richFeed, raceDate, raceTime, raceid } = pageContext

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
      single race odds
    </Layout>
  )
}

export default SingleRaceOdds
