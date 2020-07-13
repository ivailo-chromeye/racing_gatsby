import { Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../layout"
import RacesListTop from "./RacesListTop"
import SearchComponent from "../SearchComponent";
import s from './singleRace.module.css';

import Btn from '../../smallComponents/btn/btn'
import TextBox from '../../smallComponents/textBox';
import FlexComponent from '../../smallComponents/FlexComponent'
import { sortRunners } from '../../helper/index';
import Modal from '../ModalComponent'
import RaceInfo from './RaceInfo';
import RaceRunners from './RaceRunners'
import CollapseComponent from "../CollapseComponent";
import BettingForecast from "./BettingForecast";
import { transformVerdict } from "../../helper/transform";
import RaceControls from "./RaceControls";

const Race = ({ pageContext, location }) => {
  const { 
    racesMenu,
    raceid,
    raceTime,
    raceDate,
    horsesWithRaces,
    wpRace,
    finished,
    richFeed,
  } = pageContext;

  console.log({racesMenu});

  const [state, setState] = useState({
    activeMenuDay: raceDate,
  });

  const [sortObj, setSortObj] = useState({
    filter: "start_number",
    dir: false,
  });
  // const [modal, setModal] = useState({open: false, runner: null});

  const applyFilter = (filter) => {
    setSortObj({
      ...sortObj,
      filter,
      dir: !sortObj.dir,
    })
  };


  const sortedRunners = sortRunners(richFeed.API_runners, sortObj);
  
  return (
    <Layout>
      {/* <Modal modal={modal} setModal={setModal} /> */}

      <RacesListTop 
        activeMenuDay={state.activeMenuDay}
        racesMenu={racesMenu}
        setState={setState}
        raceid={raceid}
      />

      <SearchComponent 
        raceid={raceid}
        showButtons={true}
        horsesWithRaces={horsesWithRaces}
      />

      <RaceInfo 
        title={richFeed.race_instance_title}
        distance_yard={richFeed.distance_yard}
        race_class={richFeed.race_class}
        rp_ages_allowed_desc={richFeed.rp_ages_allowed_desc}
        raceDate={raceDate}
        raceTime={raceTime}
        winner={richFeed.prizes[0]['prize_sterling']}
        no_of_runners={richFeed.API_runners.length}
      />

      <RaceControls 
        raceDate={raceDate}
        raceid={raceid}
      />


      <TextBox
        borderColor="darkblue"
        background="lightblue"
      >{wpRace.acf.custom_text}</TextBox>

      <RaceRunners
        finished={finished}
        runners={sortedRunners}
        raceDate={raceDate}
        raceTime={raceTime}
        activeFilter="start_number"
        applyFilter={applyFilter}
      />

      <BettingForecast 
        betting_forecast={richFeed.betting_forecast}
      />

      <CollapseComponent label="VERDICT">
        <div>
          {transformVerdict(richFeed.verdict.verdict.comments)}
        </div>
      </CollapseComponent>
      <CollapseComponent label="PREVIOUS GOLD CUP WINNERS (table)">
        <div 
          // dangerouslySetInnerHTML={{__html: race.past_10_winners}}
          ></div>
      </CollapseComponent>
      <CollapseComponent label="KEY GOLD CUP STATS">
        <div 
          // dangerouslySetInnerHTML={{__html: race.key_race_stats}}
          ></div>
      </CollapseComponent>
      <CollapseComponent label="WHAT HAPPENED LAST YEAR">
        <div 
          // dangerouslySetInnerHTML={{__html: race.what_happened_last_year}}
          ></div>
      </CollapseComponent>



      


    </Layout>
  )
}

export default Race;