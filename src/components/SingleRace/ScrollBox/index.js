import React from "react";
import s from './style.module.css';


const scrollElements = [
  {label: "Betting Forecast", scrollToEl: "bettingForecast"},
  {label: "Racing Post Tip", scrollToEl: "verdict"},
  {label: "Previous Winners", scrollToEl: "winners"},
  {label: "Key Race Stats", scrollToEl: "keyRaceStats"},
  {label: "2019 Winners", scrollToEl: "whly"},
];

const ScrollBox = ({ scrollToFn }) => {
  return (
    <div className={s.scroll_box}>
      {scrollElements.map(({label, scrollToEl}) => {
        return (
          <div 
            onClick={() => scrollToFn(scrollToEl)}
            className={s.scroll_box_item}
            key={label}>
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default ScrollBox;