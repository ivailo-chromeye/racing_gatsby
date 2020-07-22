import React, { Fragment } from "react"
import s from "./style.module.css"

const Odds = ({ race, bookies }) => {

  console.log(race);

  const { API_runners } = race


  return (
    <Fragment>
      {API_runners.map(r => {
        return (
          <div key={r.horse_uid} className={s.rTableRow}>
            <div className={s.rTableCell} >
              <span>{r.horse_name}</span>
            </div>
            {bookies.map(bookie => (
              <div key={bookie.name} className={s.rTableCell}>
                <span>
                  <a>-</a>
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </Fragment>
  )
}

export default Odds
