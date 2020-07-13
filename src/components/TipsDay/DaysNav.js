import React from 'react';
import { Link } from 'gatsby';
import s from './style.module.css';

const DaysNav = ({ daysNav, dayNumber }) => {
  console.log(dayNumber);
  return (
    <div className={s.sec_nav}>
      {daysNav.map((u,index) => {
        const day = index + 1;
        return (
          <Link className={dayNumber === day ? s.active : ""} key={index} to={`/royal-ascot/tips/day-${day}`}>
            Day {day} Tips
          </Link>
        )
      })}
    </div>
  )
}

export default DaysNav;