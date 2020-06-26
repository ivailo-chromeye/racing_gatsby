import { Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../layout"
import RacesListTop from "./RacesListTop"
import SearchComponent from '../SearchComponent';
import s from './singleRace.module.css';
import QuestionSVG from '../../smallComponents/svg/questionSvg'
import Btn from '../../smallComponents/btn/btn'
import TextBox from '../../smallComponents/textBox';
import FlexComponent from '../../smallComponents/FlexComponent'
import { sortRunners } from '../../helper/index';
import Modal from '../ModalComponent'
import RaceInfo from './RaceInfo';
import RaceRunners from './RaceRunners'
import CollapseComponent from "../CollapseComponent";

const Race = ({ pageContext, location }) => {
  
  // const raceID = location.pathname.split("/")[2];
  // const race = pageContext.race;
  // const ascotFeed = JSON.parse(pageContext.ascotFeed);
  // const runners = JSON.parse(pageContext.runners);


  // const horsesWithRaces = [];
  // ascotFeed.map(day => {
  //   day.races.map(race => {
  //     race.API_runners.map(runner => {
  //       horsesWithRaces.push({
  //         date: day.race_date_diffusion,
  //         race_instance_title: race.race_instance_title,
  //         race_instance_uid: race.race_instance_uid,
  //         horse_name: runner.horse_name,
  //         horse_uid: runner.horse_uid,
  //       })
  //     })
  //   })
  // })

  // function getDayObject() {
  //   let dayObject = {
  //     activeRace: null,
  //     activeDay: null,
  //   }

  //   ascotFeed.map((day, dayindex) => {
  //     let activeRace = day.races.find(race => {
  //       return race.race_instance_uid == raceID
  //     })
  //     if (activeRace) {
  //       dayObject["activeRace"] = activeRace
  //       dayObject["activeDay"] = dayindex
  //     }
  //   })

  //   return dayObject
  // } // definitely need to rewrite it better

  // const dayObject = getDayObject();

  // const [activeTab, setActiveTab] = useState(dayObject.activeDay)
  // const [activeRace, setActiveRace] = useState(dayObject.activeRace)
  // const [state, setState] = useState(JSON.parse(pageContext.data));
  // const [sortObj, setSortObj] = useState({
  //   filter: "start_number",
  //   dir: false,
  // });
  // const [modal, setModal] = useState({open: false, runner: null});

  // let activeDay = !isNaN(activeTab) ? ascotFeed[activeTab] : null;

  // const applyFilter = (filter) => {
  //   setSortObj({
  //     ...sortObj,
  //     filter,
  //     dir: !sortObj.dir,
  //   })
  // };

  // console.log({
  //   activeDay,
  //   dayObject,
  //   ascotFeed,
  //   component: "templates/race.js",
  //   raceID,
  //   horsesWithRaces,
  //   racecard: state.racecard,
  // });

  // const sortedRunners = sortRunners(dayObject.activeRace.API_runners, sortObj)

  return (
    <Layout>
      {/* <Modal modal={modal} setModal={setModal} /> */}
      single race page
      {/* <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={activeDay}
        setActiveTab={setActiveTab}
      /> */}

      {/* <FlexComponent>
        <FlexComponent>
          <div style={{marginRight: 10}}>
            <Btn cta_url={`#`} background="hover_red" type="link">Odds Comparison</Btn>
          </div>
          <div>
            <Btn cta_url={`#`} background="hover_red" type="link">Tips</Btn>
          </div>
        </FlexComponent>
        <SearchComponent horsesWithRaces={horsesWithRaces} />
      </FlexComponent> */}

      {/* <RaceInfo dayObject={dayObject} card={state.racecard} /> */}
{/* 
      <div className={s.detailed_flex}>
        <QuestionSVG />
        <Btn 
          type="black"
          cta_url={`https://www.racingpost.com/results/2/ascot/2020-03-13/743616/`}>
            View Full Result
        </Btn>
      </div> */}

      {/* <TextBox
        borderColor="darkblue"
        background="lightblue"
      >{race.custom_text}</TextBox> */}

      {/* <RaceRunners 
        race_time_diffusion={activeDay.races.find(race => race.race_instance_uid == raceID).race_time_diffusion}
        race_date_diffusion={activeDay.race_date_diffusion}
        setModal={setModal} 
        activeFilter={sortObj.filter} 
        runners={sortedRunners} 
        applyFilter={applyFilter} /> */}
{/* 
      <CollapseComponent label="VERDICT">
        <div dangerouslySetInnerHTML={{__html: race.racing_post_tip_dropdown}}></div>
      </CollapseComponent>
      <CollapseComponent label="PREVIOUS GOLD CUP WINNERS (table)">
        <div dangerouslySetInnerHTML={{__html: race.past_10_winners}}></div>
      </CollapseComponent>
      <CollapseComponent label="KEY GOLD CUP STATS">
        <div dangerouslySetInnerHTML={{__html: race.key_race_stats}}></div>
      </CollapseComponent>
      <CollapseComponent label="WHAT HAPPENED LAST YEAR">
        <div dangerouslySetInnerHTML={{__html: race.what_happened_last_year}}></div>
      </CollapseComponent> */}




    </Layout>
  )
}

export default Race;