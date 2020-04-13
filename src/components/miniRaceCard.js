import React from "react"
import st from '../styles/racecards.module.css';

const MiniRaceCard = (race) => {
  return (
    <div className={st.racecard}>
        <div className={st.racecardTop}>
            <div>
                <p className={st.time}>{race.race_time_diffusion}</p>
                <p className={st.raceDetail}>{race.race_instance_title}</p>
            </div>
        </div>
        
        {race.API_runners
            .filter((i, index) => (index < 3))
            .map(runner => {
            return (
                <div className={st.runnersContainer}>
                    <div className={st.runner}>
                        <p className={st.position}>{runner.start_number}</p>
                        <img className={st.silk} src={runner.silk_image_png}/>
                        <div>
                            <h3 className={st.name}>{runner.horse_name}</h3>
                            <p className={st.jokey}>{runner.jockey_name}</p>
                            <p className={st.trainer}>{runner.trainer_stylename}</p>
                        </div>
                    </div>
                </div>
            )
        })}

        <div className={st.button}>
            <a className={st.cardBtn} href="#">View Race</a>
        </div>
    </div>
  )
}

export default MiniRaceCard