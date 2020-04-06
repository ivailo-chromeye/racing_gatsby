import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/racesListTop"
import Search from '../components/search';



const Race = props => {
  const raceID = props.location.pathname.split("/")[2]
  const race = props.pageContext.race
  const feed = JSON.parse(props.pageContext.feed)

  function getDayObject() {
    let dayObject = {
      activeRace: null,
      activeDay: null,
    }

    feed.map((day, dayindex) => {
      let activeRace = day.races.find(race => {
        return race.race_instance_uid == raceID
      })
      if (activeRace) {
        dayObject["activeRace"] = activeRace
        dayObject["activeDay"] = dayindex
      }
    })

    return dayObject
  } // definitely need to write it better

  const dayObject = getDayObject()

  const [activeTab, setActiveTab] = useState(dayObject.activeDay)
  const [activeRace, setActiveRace] = useState(dayObject.activeRace)

  return (
    <Layout>
      <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={feed[activeTab]}
        setActiveTab={setActiveTab}
      />

      <Search />

      <h3>title: {race.title}</h3>
      <h3>raceid: {race.raceid}</h3>
      <h3>race_datetime: {race.race_datetime}</h3>
    </Layout>
  )
}

export default Race
