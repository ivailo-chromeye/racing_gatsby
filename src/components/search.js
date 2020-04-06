import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import s from '../styles/search.module.css';
import { f } from '../helper/index'

const Search = ({ horsesWithRaces }) => {
  const [input, setInput] = useState('');

  // const horses = (useStaticQuery(graphql`
  //   {
  //     allWordpressWpHorse {
  //       nodes {
  //         acf {
  //           horse_name
  //           horse_uid
  //         }
  //       }
  //     }
  //   }
  // `)).allWordpressWpHorse.nodes;

  // let fHorses = input.length !== 0 ? 
  //   horses.filter(h => h.acf.horse_name.indexOf(input) > -1) : [];

  const showHorse = ({ horse_name, horse_uid}) => {
    horse_name = f(horse_name);
    window.open(
      `https://www.racingpost.com/profile/horse/${horse_uid}/${horse_name}`,
      "horse",
      "width=750,height=800"
    );
  }

  const showRace = ({ race_instance_uid, date }) => {
    window.open(
      `https://www.racingpost.com/results/11/cheltenham/${date}/${race_instance_uid}/`,
      "horse",
      "width=750,height=800"
    );
  }

  let filtered = horsesWithRaces.filter(h => {
    return h.horse_name.indexOf(input) > -1
  });

  return (
    <div>
      <div>
        <input 
          onChange={e => setInput(e.target.value)}
          value={input} 
          type="text" 
          placeholder="Enter horse name" />

        {input.length > 0 ? <div className={s.horses_container}>
          <div className={s.search_horses}>

            {filtered.map(h => {
              
              return (
                <div key={h.horse_uid} className={s.horse_feed}>
                  <span 
                    onClick={() => showHorse({ 
                      horse_name: h.horse_name,
                      horse_uid: h.horse_uid,
                    })}
                    className={s.horse_feed_name}>{h.horse_name}</span>
                  <br />
                  <span 
                    onClick={() => showRace({ 
                      date: h.date,
                      race_instance_uid: h.race_instance_uid,
                    })}
                  className={s.horse_feed_races}>{h.race_instance_title}</span>
                </div>
              )
            })}
          </div>
        </div> : null}

      </div>
    </div>
  )
}

export default Search;