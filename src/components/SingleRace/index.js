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
import Offers from "./Offers";
import ScrollBox from "./ScrollBox";
import { useRef } from "react";

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

//   betting_forecast
// verdict_header
// winners_header
// key_race_stats_header
// whly_header

  const refs = {
    bettingForecast: useRef(null),
    verdict: useRef(null),
    winners: useRef(null),
    keyRaceStats: useRef(null),
    whly: useRef(null),
  }




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

  const scrollToFn = el => {
    const { offsetTop } = refs[el].current;
    window.scrollTo(0, offsetTop);
  }

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

      <ScrollBox 

        scrollToFn={scrollToFn}
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

      <Offers title={richFeed.race_instance_title} />

      <RaceRunners
        finished={finished}
        runners={sortedRunners}
        raceDate={raceDate}
        raceTime={raceTime}
        activeFilter="start_number"
        applyFilter={applyFilter}
      />

      <BettingForecast 
        bettingForecastRef={refs.bettingForecast}
        betting_forecast={richFeed.betting_forecast}
      />



      <CollapseComponent 
        refHook={refs.verdict}
        
        color="var(--black)"
        backgroundColor="var(--collapse_gray)" 
        label="VERDICT">
        <div >
          {transformVerdict(richFeed.verdict.verdict.comments)}
        </div>
      </CollapseComponent>
      <CollapseComponent 
        refHook={refs.winners}
        color="var(--black)"
        backgroundColor="var(--collapse_gray)" 
        label="PREVIOUS GOLD CUP WINNERS (table)">
        <div 
          
          // dangerouslySetInnerHTML={{__html: race.past_10_winners}}
          ></div>
      </CollapseComponent>
      <CollapseComponent 
        refHook={refs.keyRaceStats}
        color="var(--black)"
        backgroundColor="var(--collapse_gray)" 
        label="KEY GOLD CUP STATS">
        <div 
          
          // dangerouslySetInnerHTML={{__html: race.key_race_stats}}
          ></div>
      </CollapseComponent>
      <CollapseComponent 
        refHook={refs.whly}
        color="var(--black)"
        backgroundColor="var(--collapse_gray)" 
        label="WHAT HAPPENED LAST YEAR">
        <div 
          
          // dangerouslySetInnerHTML={{__html: race.what_happened_last_year}}
          ></div>
      </CollapseComponent>



      


    </Layout>
  )
}

export default Race;