import React, { Fragment } from "react"
import Layout from "../layout"
import PageHeadline from "../pageHeadline"
import s from "./style.module.css"
import DaysNav from "./DaysNav"
import CircleSVG from "../../smallComponents/svg/circleSvg"

const TipsDay = ({ pageContext, location }) => {
  const { dayObject, dayNumber, daysNav, wpRaces } = pageContext

  console.log({ wpRaces })

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

        console.log({ wpRace })

        //race_preview_text

        return (
          <div className={s.container}>
            <div key={race.race_instance_uid} className={s.single_race}>
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
        {wpRaces.map(wprace => {
          return <div className={s.race_info}>1</div>
        })}
      </div>
    </Layout>
  )
}

export default TipsDay
