import React from 'react';
import s from './raceInfo.module.css';
import { numberWithCommas } from '../../../helper/index';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const transformRaceDateForRaceInfo = raceDate => {
  const dateArray = raceDate.split("-");

  return [
    dateArray[2], 
    months[parseInt(dateArray[1])], 
    dateArray[0],
  ];
}

const transformDistance = yards => {

  let miles = Math.trunc(yards / 1760)
  let yardsLeft = yards % 1760
  let furlongs = Math.trunc(yardsLeft / 220)
  let left = yardsLeft % 220
  return ({
    miles,
    furlongs,
    left,
  })
}

const RaceInfo = ({ 
  wpRace,
  raceTime,
  raceDate,
}) => {

  const {
    title,
    distance_yard,
    race_class,
    rp_ages_allowed_desc,
  } = wpRace.acf;

  const transformedDate = transformRaceDateForRaceInfo(raceDate);
  const transformedDistance = transformDistance(+distance_yard);

  return (
    <div className={s.race_card}>
      <div className={s.left}>
        <div className={s.race_box}>
          <div className={s.race_title}>{raceTime} Ascot</div>
          <div className={s.race_time}>{transformedDate.join(" ")}</div>
        </div>
        <div className={s.race_distance}>
          {transformedDistance.miles}m{transformedDistance.furlongs}f{transformedDistance.left}y
          &nbsp;{title}{" "}
          (Class {race_class})
          ({rp_ages_allowed_desc})
        </div>
      </div>
      <div className={s.right}>
        <div className={s.prize}>
          <span>Winner:</span>
          <span>lorem{/*`£${card.prize}`*/}</span>
        </div>
        <div className={s.no_of_runners}>
          <span>Runners:</span>
          <span>{/*dayObject.activeRace.API_runners.length*/}</span>
        </div>
        <div className={s.going_type_desc}>
          <span>Going:</span>
          <span>{/*card["going_type_desc"] ? card["going_type_desc"] : ""*/}</span>
        </div>
      </div>
    </div>
  )
}

export default RaceInfo;