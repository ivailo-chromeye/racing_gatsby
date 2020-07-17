import React, { Fragment } from "react"
import Layout from "../layout"
import PageHeadline from "../pageHeadline"
import s from "./style.module.css"
import DaysNav from "./DaysNav"
import CircleSVG from "../../smallComponents/svg/circleSvg"
import ClockSVG from "../../smallComponents/svg/clockSvg"
import CalendarSVG from "../../smallComponents/svg/calendarSvg"
import { Link } from 'gatsby'

const TipsDay = ({ pageContext, location }) => {
  const { dayObject, dayNumber, daysNav, wpRaces } = pageContext

  const sortedRaces = wpRaces.sort((a, b) => {
    const timeA = a.acf.race_datetime.split('|')[1];
    const timeB = b.acf.race_datetime.split('|')[1];

    const dA = new Date();
    dA.setHours(timeA.split(":")[0]);
    dA.setMinutes(timeA.split(":")[1]);
    const dATime = dA.getTime();

    const dB = new Date();
    dB.setHours(timeB.split(":")[0]);
    dB.setMinutes(timeB.split(":")[1]);
    const dBTime = dB.getTime();

    return dATime > dBTime ? 1 : -1;
  });

  return (
    <Layout>
      <PageHeadline
        title={`ROYAL ASCOT DAY ${dayNumber} TIPS`}
        subtitle={`Find out who are experts are tipping for the day one of Royal Ascot 2020`}
      />

      <DaysNav daysNav={daysNav} dayNumber={dayNumber} />

      {dayObject.list.map(race => {
        const wpRace = wpRaces.find(raceArg => {
          return raceArg.acf.raceid == race.race_instance_uid
        })

        // console.log({ wpRace })

        

        return (
          <div key={race.race_instance_uid} className={s.container}>
            <div className={s.single_race}>
              <h3>
                <span>{race.race_time_diffusion}</span>
                {race.race_instance_title}
              </h3>
              <div className={s.tips}>
                <div className={s.rp_tip}>
                  <div className={s.stip}>
                    <div className={s.tipster}>
                      <CircleSVG />
                      <div>
                        <h3>RACING POST TIP</h3>
                      </div>
                    </div>
                    <div className={s.horse}>
                      <img src="//images.racingpost.com/png_silks/6/5/8/41856.png" />
                      <h3 className={s.name}>Kaeso</h3>
                    </div>
                    <p></p>
                    <div className={s.short_description}>
                      <p>{wpRace.acf.racingpost_tip_text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className={s.container}>
        {sortedRaces.map(wprace => {
          let date = wprace.acf.race_datetime.split("|")[0].split("-");
          let formattedDate = `${date[2]}-${date[1]}`;
          let time = wprace.acf.race_datetime.split("|")[1];
          return (
            <div key={wprace.slug} className={s.race_info}>
              <div>
                <h3>{wprace.acf.title}</h3>
                <p className={s.event_time}>
                  <span>
                    <CalendarSVG />
                    {formattedDate}
                  </span>
                  <span style={{marginLeft: 10}}>
                    <ClockSVG />
                    {time}
                  </span>
                </p>
              </div>
              <div className={s.race_review}>
                <p>{wprace.acf.race_preview_text}</p>
              </div>
              <div className={s.tip_buttons}>
                <div className={s.fb_btn}>
                  <Link to={`/races/${wprace.acf.raceid}`}>View Race
                  </Link> 
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default TipsDay
