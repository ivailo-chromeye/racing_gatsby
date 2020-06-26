import React from "react"
import { Link } from "gatsby"
import s from "./racesListTop.module.css"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import ArrowSVG from '../../../smallComponents/svg/arrowSvg';
import NoItemsAvailable from "../../../smallComponents/NoItemsAvailable"

const RacesListTop = ({ dayObject, activeTab, feed, setActiveTab }) => {

  const days = [
    { label: "Tuesday's Races" },
    { label: "Wednesday's Races" },
    { label: "Thursday's Races" },
    { label: "Friday's Races" },
    { label: "Saturday's Races" },
  ]

  return (
    <>
      <div className={s.races_list}>
        <div className={s.list_top}>
          {days.map((day, i) => {
            return (
              <div
                onClick={() => setActiveTab(activeTab !== i ? i : null)}
                key={day.label}
                className={s.card}
              >
                <div className={activeTab === i ? s.card_name_active : s.card_name}>
                  <div className={s.list_top_card_name}>
                    {day.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!feed ? <NoItemsAvailable message="No races" /> : 
        <div className={s.list_content}>
          {feed.races.map((raceArg, raceIndex) => {
            // console.log(raceArg)
            return (
              <div key={raceIndex}>
                <AniLink
                  partiallyActive={true}
                  fade
                  duration={0.5}
                  className={s.race}
                  to={`/races/${raceArg.race_instance_uid}/`}
                >
                  <div
                    className={
                      raceArg.race_instance_uid !==
                      dayObject.activeRace.race_instance_uid
                        ? s.race_top
                        : s.race_top_active
                    }
                  >
                    <span className={s.race_top_time}>
                      {raceArg.race_time_diffusion}
                    </span>
                    <span className={s.race_top_title}>
                      {raceArg.race_instance_title}
                    </span>
                  </div>
                </AniLink>
              </div>
            )
          })}
          
        </div>
      }
    </>
  )
}

export default RacesListTop
