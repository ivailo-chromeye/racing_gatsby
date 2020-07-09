import React, { Fragment, useState, useEffect } from 'react'

import SpotlightSVG from '../../../smallComponents/svg/spotlightSvg';
import s from '../singleRace.module.css';
import styleRacecards from '../../../styles/racecards.module.css'
import {rpModal} from '../../../helper/index';

import PlaceBetBtn from '../../../smallComponents/PlaceBetBtn';
import TableTop from "./TableTop";

// import d from "rp-diffusion";
const diffusionConfig = {
  host: 'push-cards.racingpost.com',
  port: 443
}

const utility = {
  fractional: array => {
    if (array === "-") return "-";
    return "" + parseFloat(((+array.split('/')[0] / +array.split('/')[1]) + 1).toFixed(2));
  },
}


const active = {borderBottom: "2px solid var(--yellow_active_filter)"};

export default function RaceRunners ({ 
  runners, 
  applyFilter, 
  activeFilter, 
  // setModal, 
  raceDate, 
  raceTime,
  finished,
}) {


  const [state, setState] = useState({activeList: []});
  const [odds, setOdds] = useState({
    bestodds: {},
    hOdds: {},
    hOddsEw: {},
  });
  const [topic, setTopic] = useState({
    "HORSES": "HORSES",
    "date": raceDate,
    "venue": "ASCOT",
    "time": raceTime,
    "WIN": "WIN",
    "horse_name": "",
    "bookie_name": "#BESTODDS",
  });

  const openModal = (runner) => {
    console.log('modal');
    // setModal(prevState => {
    //   return {
    //     ...prevState,
    //     open: true,
    //     runner,
    //   };
    // })
  }

  const spotlightClick = (horse_uid) => {
    console.log('spotliht click');
    let array = state.activeList;

    if(state.activeList.indexOf(horse_uid) === -1) { // not in the array
      array.push(horse_uid)
    } else {
      array.splice(state.activeList.indexOf(horse_uid), 1)
    }
    console.log(array);
    setState({
      ...state.activeSpotlights,
      activeList: array,
    });

  }

  // console.log(runners);

  useEffect(() => {
    // bail early
    if(finished) return;

    const allOddsObject = {
      bestodds: {},
      hOdds: {},
      hOddsEw: {},
    };
    const len = runners.length;
    // console.log({len, race_date_diffusion, race_time_diffusion});

    window.diffusion.connect(diffusionConfig).then(session => {
      console.log({diffusion: window.diffusion});

      let runnersCounter = 0;

      runners.forEach(runner => {
        const topicArray = [];

        for (let key in topic) {
          key === "horse_name" ? topicArray.push(runner.horse_name_diffusion) : topicArray.push(topic[key]);
        }

        session
          .subscribe(topicArray.join("/"))
          .transform(String)
          .on('update', value => {

            runnersCounter += 1;

            let arr = value.split("\u0002");
            let bestOdds = arr[7];
            

            let decimalOdds;
            if (bestOdds === "Evs") {
              decimalOdds = "Evs";
            } else if (bestOdds && bestOdds !== "-") {
              decimalOdds = utility.fractional(bestOdds)
            }

            // console.log({runner:runner.horse_uid,bestOdds, decimalOdds});
            allOddsObject["bestodds"][runner.horse_uid] = `${bestOdds}|${decimalOdds}`;

            if (runnersCounter === runners.length) {
              setOdds(allOddsObject)
            }
          });

      });

      


    });
  }, []);

  // console.log({odds});

  return (
    <div className={s.runners_and_ad}>
    <div className={s.runners}>
      <table>
        <thead>
          <TableTop 
            finished={finished}
            applyFilter={applyFilter}
            active={active}
            activeFilter={activeFilter} 
            />
        </thead>
        <tbody>
          {runners.map(runner => {
            // console.log(runner);
            const spotlightActive = state.activeList.indexOf(runner.horse_uid) > -1;
            
            // console.log({
            //   "runner.horse_uid": runner.horse_uid,
            //   oddsForHorse: odds['bestodds'][runner.horse_uid]
            // });

            return (
              <Fragment key={runner.horse_uid}>
                <tr className={'runner_tr'} >
                  <td>
                    <div className="start_number">{runner.start_number}</div>
                    <div className="form">{runner.figures}</div>
                  </td>

                  <td className={s.horse_box}>
                    <div className={s.horse_box_flex}>
                      <div className={s.horse_box_left}>
                        <img src={`https://${runner.silk_image_png}`} />
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
                        <div 
                          onClick={() => spotlightClick(runner.horse_uid)}
                          className="horse-box-right-bottom">
                          <SpotlightSVG active={spotlightActive} />
                        </div>
                      </div>
                    </div>
                  </td>

                  {!finished && <td className="padding-2">
                    <div 
                      className={s.best_odds_box}
                      onClick={() => openModal(runner)}
                    >
                      <div className={s.best_odds_top}>
                      {odds['bestodds'][runner.horse_uid] ? odds['bestodds'][runner.horse_uid].split("|")[0] : null}                          
                      </div>                      
                      <div className={s.best_odds_bottom}>PLACE BET</div>
                    </div>
                  </td>}  

                  <td>
                    <div
                      // onClick={() => rpModal({
                      //   type: 'jockey',
                      //   id: runner.jockey_uid,
                      //   name: runner.jockey_name,
                      //   date: null,
                      // })}
                      className={s.trainer}>
                        <span className={s.trainerSpan}>J:</span>
                        {runner.jockey_name}
                    </div>   
                    <div
                      // onClick={() => rpModal({
                      //   type: 'trainer',
                      //   id: runner.trainer_id,
                      //   name: runner.trainer_stylename,
                      //   date: null,
                      // })}
                      className={s.trainer}>
                        <span className={s.trainerSpan}>T:</span>
                        {runner.trainer_stylename}
                    </div>   
                  </td>

                  <td>{runner.horse_age}</td>
                  <td>11-7</td>
                  <td>155</td>
                  <td>158</td>
                </tr>
                {spotlightActive && <tr className={s.runner_spotlight}>
                  <td colSpan={8}>
                    <div className="spotlight_flex">Lorem text for {runner.horse_name}</div>
                  </td>
                </tr>}
              </Fragment>
            )
          })}
          
        </tbody>
      </table>
    </div>
    <div className="small-ad-container"></div>
  </div>
  )
}
