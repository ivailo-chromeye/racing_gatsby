import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/racesListTop/racesListTop"
import Search from '../components/search/search';
import s from './race.module.css';
import styleRacecards from '../styles/racecards.module.css'

import Modal from '../components/modal/modal'

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
  const [sortObj, setSortObj] = useState({
    filter: "start_number",
    dir: false,
  });
  const [modal, setModal] = useState({open: false, runner: null});

  let activeDay = !isNaN(activeTab) ? feed[activeTab] : null;

  const applyFilter = (filter) => {
    setSortObj({
      ...sortObj,
      filter,
      dir: !sortObj.dir,
    })
  }

  const sortedRunners = () => {
    return runners.sort((a,b)=> {

      switch(sortObj.filter) {
        case "start_number": {
          if(sortObj.dir) {
            return a.start_number > b.start_number ? 1 : -1;
          } else {
            return a.start_number > b.start_number ? -1 : 1;
          }
        }
        case "horse_name": {
          if(sortObj.dir) {
            return b["horse_name"].localeCompare(a["horse_name"])
          } else {
            return a["horse_name"].localeCompare(b["horse_name"]);
          }
        }
        case "jockey": {
          if(sortObj.dir) {
            return b["jockey_name"].localeCompare(a["jockey_name"])
          } else {
            return a["jockey_name"].localeCompare(b["jockey_name"]);
          }
        }
        case "trainer": {
          if(sortObj.dir) {
            return b["trainer_stylename"].localeCompare(a["trainer_stylename"])
          } else {
            return a["trainer_stylename"].localeCompare(b["trainer_stylename"]);
          }
        }
        case "age": {
          if(sortObj.dir) {
            return a.horse_age > b.horse_age ? 1 : -1;
          } else {
            return a.horse_age < b.horse_age ? 1 : -1;
          }
        }
        default: return 1;
      }
    });
  }

  return (
    <Layout>
      <Modal modal={modal} setModal={setModal} />
      <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={activeDay}
        setActiveTab={setActiveTab}
      />

      <Search horsesWithRaces={horsesWithRaces} />

      <RaceInfo card={state.racecard} />

      <RaceRunners setModal={setModal} activeFilter={sortObj.filter} runners={sortedRunners()} applyFilter={applyFilter} />



      <h3>title: {race.title}</h3>
      <h3>raceid: {race.raceid}</h3>
      <h3>race_datetime: {race.race_datetime}</h3>
    </Layout>
  )
}

export default Race;