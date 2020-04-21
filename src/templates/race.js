import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/racesListTop/racesListTop"
import Search from '../components/search/search';
import s from './race.module.css';
import styleRacecards from '../styles/racecards.module.css'
import {rpModal} from '../helper/index';


import RaceInfo from '../components/raceInfo/raceInfo';

import RaceRunners from '../components/raceRunners/raceRunners'

const Race = ({ pageContext, location }) => {
  
  const raceID = location.pathname.split("/")[2]
  const race = pageContext.race
  const feed = JSON.parse(pageContext.feed)
  const runners = JSON.parse(pageContext.runners);

  const horsesWithRaces = [];
  feed.map(day => {
    day.races.map(race => {
      race.API_runners.map(runner => {
        horsesWithRaces.push({
          date: day.race_date_diffusion,
          race_instance_title: race.race_instance_title,
          race_instance_uid: race.race_instance_uid,
          horse_name: runner.horse_name,
          horse_uid: runner.horse_uid,
        })
      })
    })
  })

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
  const [state, setState] = useState(JSON.parse(pageContext.data));

  let activeDay = !isNaN(activeTab) ? feed[activeTab] : null;

  const applyFilter = () => {
    console.log('apply filter');
  }
  console.log('racejs');

  return (
    <Layout>
      <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={activeDay}
        setActiveTab={setActiveTab}
      />

      <Search horsesWithRaces={horsesWithRaces} />

      <RaceInfo card={state.racecard} />

      <RaceRunners runners={runners} applyFilter={applyFilter} />



      <h3>title: {race.title}</h3>
      <h3>raceid: {race.raceid}</h3>
      <h3>race_datetime: {race.race_datetime}</h3>
    </Layout>
  )
}

export default Race;