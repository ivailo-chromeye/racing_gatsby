import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/racesListTop"
import Search from '../components/search';
import s from './race.module.css';
import {
  rpModal,
} from '../helper/index';

import TooltipSVG from '../images/tooltip.svg';

const Race = ({ pageContext, location }) => {
  
  const raceID = location.pathname.split("/")[2]
  const race = pageContext.race
  const feed = JSON.parse(pageContext.feed)
  const runners = JSON.parse(pageContext.runners);
  // console.log(pageContext);

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

  return (
    <Layout>
      <RacesListTop
        dayObject={dayObject}
        activeTab={activeTab}
        feed={feed[activeTab]}
        setActiveTab={setActiveTab}
      />

      <Search horsesWithRaces={horsesWithRaces} />

      <div className={s.runners_and_ad}>
        <div className={s.runners}>
          <table>
            <thead>
              <tr>
                <th>
                  <div className={s.th_div}>
                    <span>NO.DRAW FORM</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Saddle Number</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>HORSE</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Horse Name</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                  <span>ODDS</span><div className="tooltip">
                    <span className="tooltiptext">Sort by Best Odds</span>
                    <TooltipSVG />
                  </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>JOCKEY</span>&
                    <span>TRAINER</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Trainer</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>AGE</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Horse Age</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>WGT</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Weight</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>OR</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Official Rating</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>RPR</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Racing Post Rating</span>
                      <TooltipSVG />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              
              {runners.map(runner => {
                console.log({runner});
                return (
                  <tr className={'runner_tr'} key={runner.horse_uid}>
                    <td>
                      <div className="start_number">{runner.start_number}</div>
                      <div className="form">{runner.figures}</div>
                    </td>

                    <td className={s.horse_box}>
                      <div className={s.horse_box_flex}>
                        <div className={s.horse_box_left}>
                          <img src="https://images.racingpost.com/png_silks/8/4/5/170548.png" />
                        </div>
                        <div className={s.horse_box_right}>
                          <div 
                            onClick={() => rpModal({
                              type: 'horse', 
                              id: runner.horse_uid, 
                              name: runner.horse_name,
                              date: null,
                            })}
                            className={s.horse_box_right_top}>
                            {runner.horse_name}
                          </div>
                          <div className="horse-box-right-bottom">
                            <svg className={s.spotlight} viewBox="0 0 100 100">
                              <title>icon-spotlight</title>
                                <path id="XMLID_9722_" d="M60.7,79H39.5c-2.1,0-3.5-0.8-3.5-2.9c0-6.4-4.9-11.1-9.9-16c-4.9-5.6-11.3-12.7-11.3-24.7
                                    C14.8,15.5,30.3,0,50.1,0s35.3,16.2,35.3,35.3c0,12.7-6.4,21.2-12,26.1c-4.2,4.2-9.2,8.3-9.2,13.9C64.2,78.2,62.8,79,60.7,79z
                                    M43.2,71h14c1.4-7.1,7-10.9,11.3-15.1c4.9-4.9,9.9-11.4,9.9-20.5c0-15.5-12.7-27.6-27.5-27.6s-28.2,12-28.2,27.5
                                    c0,8.5,4.2,14.2,9.2,19.2C36,58.7,41.7,63.9,43.2,71z"></path>
                                <path d="M64.2,94c0,2.8-2.2,5-5,5h-18c-2.8,0-5-2.2-5-5v-4c0-2.8,2.2-5,5-5h18c2.8,0,5,2.2,5,5V94z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="padding-2">
                      <div className='best_odds_box'>
                        <div className="best-odds-top"></div>
                        <div className="best-odds-bottom">PLACE BET</div>
                      </div>
                    </td>  

                    <td>
                      <div
                        onClick={() => rpModal({
                          type: 'jockey',
                          id: runner.jockey_uid,
                          name: runner.jockey_name,
                          date: null,
                        })}
                        className={s.trainer}>
                          <span className={s.trainerSpan}>J:</span>
                          {runner.jockey_name}
                      </div>   
                      <div
                        onClick={() => rpModal({
                          type: 'trainer',
                          id: runner.trainer_id,
                          name: runner.trainer_stylename,
                          date: null,
                        })}
                        className={s.trainer}>
                          <span className={s.trainerSpan}>T:</span>
                          {runner.trainer_stylename}
                      </div>   
                    </td>

                    <td>{runner.horse_age}</td>

                    <td><div className="wgt">11-7</div></td>
                    <td>155</td>
                    <td>158</td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
        <div className="small-ad-container">
          
        </div>
      </div>

      <h3>title: {race.title}</h3>
      <h3>raceid: {race.raceid}</h3>
      <h3>race_datetime: {race.race_datetime}</h3>
    </Layout>
  )
}

export default Race
