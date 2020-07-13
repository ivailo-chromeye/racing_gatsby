import React from "react"
import s from "./style.module.css"
import SectionTitle from "../SectionTitle"

const RacesList = ({ racesMenu }) => {
  console.log({ racesMenu })

  return (
    <div>
      <SectionTitle title={"Royal Ascot Races"} />
      <div className={s.races}>
        {Object.entries(racesMenu).map(([date, day]) => (
          <div key={date} className={s[`day${date.split("-")[2]}`]}>
            {
              day.list.map(race => (
                  <a key={race.race_instance_uid} href={`https://www.racingpost.com/results/2/ascot/2020-06-16/758734/`}>
                    <div>
                      <span>{race.race_time_diffusion}</span> - {race.race_instance_title}
                    </div>
                    
                  </a>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default RacesList
