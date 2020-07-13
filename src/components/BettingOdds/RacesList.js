import React from "react";
import { Link } from "gatsby"
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
              day.list.map(race => {
                return (
                  <Link key={race.race_instance_uid} to={`/races/${race.race_instance_uid}/odds`}>
                    <div>
                      <span>{race.race_time_diffusion}</span> - {race.race_instance_title}
                    </div>
                    
                  </Link>
                )
              })
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default RacesList
