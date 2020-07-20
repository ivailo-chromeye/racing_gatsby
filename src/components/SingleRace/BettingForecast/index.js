import React from "react"
import s from "./style.module.css"

const BettingForecast = ({ betting_forecast, bettingForecastRef }) => {
  return (
    <div 
      ref={bettingForecastRef}
      className={s.betting_forecast}>
      <span>BETTING FORECAST </span>
      {Object.entries(betting_forecast).map(([key, val]) => {
        return (
          <span key={key}>
            {val.horse_name} {val.odds}
          </span>
        )
      })}
    </div>
  )
}

export default BettingForecast
