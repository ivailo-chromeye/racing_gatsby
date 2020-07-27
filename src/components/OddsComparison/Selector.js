import React, { useState } from "react"
import s from "./style.module.css"

const Selector = ({ races, activeRaceIndex, setActiveRaceIndex }) => {

  const handleChange = ({ target: {value} }) => {
    setActiveRaceIndex(value);
  }


  return (
    <div className={s.selector_wrapper}>
      <h3>Quick odds comparison for</h3>
      <select
        onChange={e => handleChange(e)}
        value={activeRaceIndex}
        className={s.comparison_selector}
      >
        {races.map(
          ({
            index,
            race_date_diffusion,
            race_instance_title,
            race_time_diffusion,
          }) => {
            return (
              <option key={index} value={index}>
                {race_time_diffusion}-{race_date_diffusion}-
                {race_instance_title}
              </option>
            )
          }
        )}
      </select>
    </div>
  )
}

export default Selector
