import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import RacesListTop from "../components/racesListTop"
import Search from '../components/search';
import s from './race.module.css';

    // subset['wgt'] = '11-7';
    //   subset['rpr'] = 158;
    //   subset['or'] = 153;

const Race = ({ pageContext, location }) => {
  const raceID = location.pathname.split("/")[2]
  const race = pageContext.race
  const feed = JSON.parse(pageContext.feed)
  const runners = JSON.parse(pageContext.runners);
  console.log(pageContext);

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
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>HORSE</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Horse Name</span>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                  <span>ODDS</span><div className="tooltip">
                    <span className="tooltiptext">Sort by Best Odds</span>
                  </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>JOCKEY</span>&
                    <span>TRAINER</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Trainer</span>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>AGE</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Horse Age</span>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>WGT</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Weight</span>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>OR</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Official Rating</span>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={s.th_div}>
                    <span>RPR</span>
                    <div className="tooltip">
                      <span className="tooltiptext">Sort by Racing Post Rating</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              
              {runners.map(runner => {
                return (
                  <tr className={'runner_tr'} key={runner.horse_uid}>
                    <td>
                      <div className="start_number">{runner.start_number}</div>
                      <div className="form">{runner.figures}</div>
                    </td>

                    <td className="horse_box">
                      <div className="horse-box-flex">
                        <div className="horse-box-left">
                          <img src="https://images.racingpost.com/png_silks/8/4/5/170548.png" />
                        </div>
                        <div className="horse-box-right">
                          <div className="horse-box-right-top">
                            {runner.horse_name}
                          </div>
                          <div className="horse-box-right-bottom">
                            spotlight
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
                        className="jockey"><span>J:</span>{runner.jockey_name}
                      </div>   
                      <div
                        className="trainer"><span>T:</span>{runner.trainer_stylename}
                      </div>   
                    </td>

                    <td>horse_age</td>

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
