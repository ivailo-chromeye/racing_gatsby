import React from 'react';
import Layout from "../layout";
import PageHeadline from '../pageHeadline';
import s from "./style.module.css";
import DaysNav from "./DaysNav"

const TipsDay = ({ pageContext, location }) => {
  const {
    race,
    dayNumber,
    daysNav,
  } = pageContext;

  console.log({daysNav,race, dayNumber});

  return (
    <Layout>
      <PageHeadline 
        title={`ROYAL ASCOT DAY ${dayNumber} TIPS`}
        subtitle={`Find out who are experts are tipping for the day one of Royal Ascot 2020`}
      />

      <DaysNav daysNav={daysNav} dayNumber={dayNumber} />

    </Layout>
  )
}

export default TipsDay;