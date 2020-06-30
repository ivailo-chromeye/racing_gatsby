import React from "react"
import { Link } from "gatsby"
import s from "./racesListTop.module.css"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import ArrowSVG from '../../../smallComponents/svg/arrowSvg';
import NoItemsAvailable from "../../../smallComponents/NoItemsAvailable"

const RacesListTop = ({ 
  racesMenu,
  activeMenuDay, 
  // feed, 
  setState,
  raceid,
}) => {

  return (
    <>
      <div className={s.races_list}>
        <div className={s.list_top}>
          {Object.entries(racesMenu).map(([date, val]) => {
            return (
              <div
                onClick={() => setState(prevState => ({...prevState, activeMenuDay: date}))}
                key={val.menuLabel}
                className={s.card}
              >
                <div className={activeMenuDay === date ? s.card_name_active : s.card_name}>
                  <div className={s.list_top_card_name}>
                    {val.menuLabel}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      { 
        <div className={s.list_content}>
          {racesMenu[activeMenuDay]["list"].map((raceArg, raceIndex) => {
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
                  <div className={raceArg.race_instance_uid === raceid ? s.race_top_active : s.race_top}>
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