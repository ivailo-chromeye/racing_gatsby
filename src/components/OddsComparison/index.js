import React, { useState } from 'react';
import s from './style.module.css';
import Selector from './Selector';
import BookiesList from './BookiesList';
import Odds from './Odds';

const bookies = [
  {name: "bet365", imgName: "b365"},
  {name: "skybets", imgName: "skybet_v3"},
  {name: "betfair", imgName: "bf"},
  {name: "paddypower", imgName: "pp"},
  {name: "william hill", imgName: "wh"},
  {name: "ladbrokes", imgName: "lad"},
  {name: "coral", imgName: "coral"},
  {name: "betway", imgName: "betway"},
  {name: "unibet", imgName: "unibet"},
  {name: "boyle", imgName: "boyle"},
  {name: "racebets", imgName: "racebets"},
]

const OddsComparison = ({ flatRaces }) => {
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