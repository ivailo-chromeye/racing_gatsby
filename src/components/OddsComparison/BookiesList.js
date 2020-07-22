import React from "react"
import s from "./style.module.css"

const baseURL = `https://www.racingpost.com/royal-ascot/wp-content/themes/RoyalAscot/images/thumbs/`;

const BookiesList = ({ bookies }) => {
  // console.log(props)

  return (
    <div className={s.rTableRow}>
      <div className={s.rTableHead}>
        <strong></strong>
      </div>
      {bookies.map(({imgName}) => (
        <div key={imgName} className={s.rTableHead}>
          <img src={`${baseURL}${imgName}.jpg`} />
        </div>
      ))}
    </div>
  )
}

export default BookiesList
