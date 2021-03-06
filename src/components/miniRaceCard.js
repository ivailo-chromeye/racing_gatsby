import React, { useState, useEffect } from "react"
import st from "../styles/racecards.module.css"
import PlaceBetBtn from "../smallComponents/PlaceBetBtn"
import Btn from "../smallComponents/btn/btn"
import { rpModal } from "../helper/index"

import { LazyLoadImage } from 'react-lazy-load-image-component';

const MiniRaceCard = ({race, raceDateDiffusion}) => {
  const [activePad, setActivePad] = useState(false)

  function togglePad() {
    setActivePad(!activePad)
  }

  return (
    <div className={[st.racecard, activePad ? st.opened : ""].join(" ")}>
      <div className={st.racecardInfo}>
        <div className={st.racecardTop}>
          <div>
            <p className={st.time}>{race.race_time_diffusion}</p>
            <p className={st.raceDetail}>{race.race_instance_title}</p>
          </div>
        </div>
        <div style={{height: '175px'}}>
        {race.API_runners.filter((i, index) => index < 3).map(runner => {
          return (
            <div key={runner.horse_uid} className={st.runnersContainer}>
              <div className={st.runner}>
                <p className={st.position}>{runner.start_number}</p>
                <LazyLoadImage alt={'silk'} className={st.silk} src={runner.silk_image_png}/>
                {/* <img className={st.silk} src={runner.silk_image_png} /> */}
                <div>
                  <h3
                    onClick={() =>
                      rpModal({
                        type: "horse",
                        id: runner.horse_uid,
                        name: runner.horse_name,
                        date: null,
                      })
                    }
                    className={st.name}
                  >
                    {runner.horse_name}
                  </h3>
                  <p className={st.jokey}>{runner.jockey_name}</p>
                  <p
                    onClick={() =>
                      rpModal({
                        type: "trainer",
                        id: runner.trainer_id,
                        name: runner.trainer_stylename,
                        date: null,
                      })
                    }
                    className={st.trainer}
                  >
                    {runner.trainer_stylename}
                  </p>
                </div>
                  {/* {race.finished ? '' : <PlaceBetBtn togglePad={togglePad}>
                  <span className="pull-odd" data-topic={'HORSES/'+raceDateDiffusion.race_date_diffusion+'/ASCOT/'+race.race_time_diffusion+'/WIN/'+ runner.horse_name.toUpperCase() +'/#BESTODDS'}>-</span>
                </PlaceBetBtn>} */}
                <PlaceBetBtn togglePad={togglePad}>
                  <span className="pull-odd" data-topic={'HORSES/'+raceDateDiffusion.race_date_diffusion+'/ASCOT/'+race.race_time_diffusion+'/WIN/'+ runner.horse_name.toUpperCase() +'/#BESTODDS'}>-</span>
                </PlaceBetBtn>
                
                {/* <p onClick={togglePad} className={st.odd}>{runner.odds['#BESTODDS']}</p> */}
              </div>
            </div>
          )
        })}
        </div>
        <div className={st.button}>
          <Btn
            type="link"
            background="btn_red"
            cta_url={`/races/${race.race_instance_uid}`}
          >
            View Race
          </Btn>
          {/* <a className={st.cardBtn} href="#">View Race</a> */}
        </div>
      </div>

      <div className={[st.oddsPad, activePad ? st.opened : ""].join(" ")}>
        <table>
          <tbody>
            <tr>
              <th>Bookmaker</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MiniRaceCard
