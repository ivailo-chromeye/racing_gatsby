import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import s from '../styles/search.module.css';
import { f } from '../helper/index'

const Search = props => {
  const [input, setInput] = useState('');

  const horses = (useStaticQuery(graphql`
    {
      allWordpressWpHorse {
        nodes {
          acf {
            horse_name
            horse_uid
          }
        }
      }
    }
  `)).allWordpressWpHorse.nodes;

  let fHorses = input.length !== 0 ? 
    horses.filter(h => h.acf.horse_name.indexOf(input) > -1) : [];

  const showHorse = ({ horse_name, horse_uid}) => {
    horse_name = f(horse_name);
    window.open(
      `https://www.racingpost.com/profile/horse/${horse_uid}/${horse_name}`,
      "horse",
      "width=750,height=800"
    );
  }

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

            {fHorses.map(h => {
              h = h.acf;
              return (
                <div key={h.horse_uid} className={s.horse_feed}>
                  <span 
                    onClick={() => showHorse({ 
                      horse_name: h.horse_name,
                      horse_uid: h.horse_uid,
                    })}
                    className={s.horse_feed_name}>{h.horse_name}</span>
                  <br />
                  <span className={s.horse_feed_races}>lorem ipsum</span>
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