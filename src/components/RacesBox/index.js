import React from 'react';

const RacesBox = ({ races, raceDays }) => {
  console.log(raceDays);
  
  races.map(race => {
    let date = race.acf.race_datetime.split(" ")[1];

    // check the date
    for(let dayName in raceDays) {
      let val = raceDays[dayName];
      console.log(val.date, date);
    }

  });

  return (
    <div>
      RacesBox
    </div>
  );
}

export default RacesBox;