import React from 'react';
import s from './raceInfo.module.css';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const transformRaceDateForRaceInfo = raceDate => {
  const dateArray = raceDate.split("-");

  return [
    dateArray[2], 
    months[parseInt(dateArray[1])], 
    dateArray[0],
  ];
}

const RaceInfo = ({ 
  title,
  distance_yard,
  race_class,
  rp_ages_allowed_desc,
  raceTime,
  raceDate,
  winner,
}) => {

  const transformedDate = transformRaceDateForRaceInfo(raceDate);

  return (
    <div className={s.race_card}>
      <div className={s.left}>
        <div className={s.race_box}>
          <div className={s.race_title}>{raceTime} Ascot</div>
          <div className={s.race_time}>{transformedDate.join(" ")}</div>
        </div>
        <div className={s.race_distance}>
          {distance_yard}
          &nbsp;{title}{" "}
          (Class {race_class})
          ({rp_ages_allowed_desc})
        </div>
      </div>
      <div className={s.right}>
        <div className={s.prize}>
          <span>Winner:</span>
          <span>£{winner}</span>
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