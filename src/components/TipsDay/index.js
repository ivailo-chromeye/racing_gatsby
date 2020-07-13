import React from 'react';
import Layout from "../layout";
import PageHeadline from '../pageHeadline';
import s from "./style.module.css";
import DaysNav from "./DaysNav"

const TipsDay = ({ pageContext, location }) => {
  const {
    dayObject,
    dayNumber,
    daysNav,
  } = pageContext;

  console.log({list: dayObject.list});

  return (
    <Layout>
      <PageHeadline 
        title={`ROYAL ASCOT DAY ${dayNumber} TIPS`}
        subtitle={`Find out who are experts are tipping for the day one of Royal Ascot 2020`}
      />

      <DaysNav daysNav={daysNav} dayNumber={dayNumber} />

      {dayObject.list.map(race => {
        console.log(race);
        return (
          <div className={s.single_race}>
            <h3>
              <span>{race.race_time_diffusion}</span>
              {race.race_instance_title}
            </h3>
          </div>
        )
      })}

    </Layout>
  )
}

export default TipsDay;