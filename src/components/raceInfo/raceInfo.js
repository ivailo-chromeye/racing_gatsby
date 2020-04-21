import React from 'react';
import s from './raceInfo.module.css';
import { numberWithCommas } from '../../helper/index'

const RaceInfo = ({ card }) => {
  


  return (
    <div className={s.race_card}>
      <div className={s.left}>
        <div className={s.race_box}>
          <div className={s.race_title}>{card.race_datetime.hours}:{card.race_datetime.minutes} {card.course_style_name}</div>
          <div className={s.race_time}>{card.race_datetime.monthDate} {card.race_datetime.month} {card.race_datetime.year}</div>
        </div>
        <div className={s.race_distance}>
          {card.distance.miles}m{card.distance.furlongs}f{card.distance.left}y
          &nbsp;{card.race_instance_title}
          (Class null)
          ({card.rp_ages_allowed_desc})
        </div>
      </div>
      <div className={s.right}>
        <div className={s.prize}>
          <span>Winner:</span>
          <span>{`£${card.prize}`}</span>
        </div>
        <div className={s.no_of_runners}>
          <span>Runners:</span>
          <span>{card["no_of_runners"]}</span>
        </div>
        <div className={s.going_type_desc}>
          <span>Going:</span>
          <span>{card["going_type_desc"] ? card["going_type_desc"] : ""}</span>
        </div>
        <div className={s.no_of_fenses}>
          <span>No. of hurdles:</span>
          <span>{card["no_of_fences"] ? card["no_of_fences"] : ""}</span>
        </div>
      </div>
    </div>
  )
}

export default RaceInfo;