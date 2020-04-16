import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import s from '../styles/search.module.css';
import { openInNewWindowRace, rpModal } from '../helper/index'

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



  let filtered = horsesWithRaces.filter(h => {
    return h.horse_name.toLowerCase().indexOf(input.toLowerCase()) > -1
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
                    onClick={() => rpModal({ 
                      type: 'horse',
                      id: h.horse_uid,
                      name: h.horse_name,
                      date: null,
                    })}
                    className={s.horse_feed_name}>{h.horse_name}</span>
                  <br />
                  <span 
                    onClick={() => rpModal({
                      type: 'race',
                      id: h.race_instance_uid,
                      name: null,
                      date: h.date,
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