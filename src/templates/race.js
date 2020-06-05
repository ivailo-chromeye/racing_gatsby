import { Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/RacesListTop"
import SearchComponent from '../components/SearchComponent';
import s from './race.module.css';
import QuestionSVG from '../smallComponents/svg/questionSvg'
import Btn from '../smallComponents/btn/btn'
import TextBox from '../smallComponents/textBox';
import FlexComponent from '../smallComponents/FlexComponent'
import { sortRunners } from '../helper/index'
import Modal from '../components/ModalComponent'
import RaceInfo from '../components/RaceInfo';
import RaceRunners from '../components/RaceRunners'
import CollapseComponent from "../components/CollapseComponent";

const Race = ({ pageContext, location }) => {
  
  const raceID = location.pathname.split("/")[2];
  const race = pageContext.race;
  const feed = JSON.parse(pageContext.feed);
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
  } // definitely need to rewrite it better

  const dayObject = getDayObject();
  console.log(dayObject);

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

  const sortedRunners = sortRunners(runners, sortObj)

  return (
    <Layout>
      <Modal modal={modal} setModal={setModal} />
      <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={activeDay}
        setActiveTab={setActiveTab}
      />

      <FlexComponent>
        <FlexComponent>
          <div style={{marginRight: 10}}>
            <Btn cta_url={`/races/${raceID}/odds/`} background="hover_red" type="link">Odds Comparison</Btn>
          </div>
          <div>
            <Btn cta_url={`/races/${raceID}/tips/`} background="hover_red" type="link">Tips</Btn>
          </div>
        </FlexComponent>
        <SearchComponent horsesWithRaces={horsesWithRaces} />
      </FlexComponent>

      <RaceInfo card={state.racecard} />

      <div className={s.detailed_flex}>
        <QuestionSVG />
        <Btn 
          type="black"
          cta_url="https://www.racingpost.com/results/11/cheltenham/2020-03-13/743616/">
            View Full Result
        </Btn>
      </div>

      <TextBox
        borderColor="textbox_border_green"
        background="dark_green"
      >{race.custom_text}</TextBox>

      <RaceRunners setModal={setModal} activeFilter={sortObj.filter} runners={sortedRunners} applyFilter={applyFilter} />

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
      </CollapseComponent>




    </Layout>
  )
}

export default Race;