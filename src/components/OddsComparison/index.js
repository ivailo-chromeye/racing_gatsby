import React, { useState } from 'react';
import s from './style.module.css';
import Selector from './Selector';
import BookiesList from './BookiesList';
import Odds from './Odds';



const OddsComparison = ({ flatRaces = [], bookies }) => {
  const [ activeRaceIndex, setActiveRaceIndex ] = useState(0);

  const races = flatRaces.map(({
    race_date_diffusion, race_time_diffusion, race_instance_title
  }, index) => ({
    index,
    race_date_diffusion,
    race_time_diffusion,
    race_instance_title,
  }));

  return (
    <div className={s.odds_comparison}>
      <Selector 
        setActiveRaceIndex={setActiveRaceIndex} 
        activeRaceIndex={activeRaceIndex} 
        races={races} />
      <div className={s.odd_compare_single_race}>
        <BookiesList bookies={bookies} />
        <Odds bookies={bookies} race={flatRaces[activeRaceIndex]} />
      </div>
    </div>
  )
}

export default OddsComparison;