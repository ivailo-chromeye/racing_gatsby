import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import s from './search.module.css';
import { openInNewWindowRace, rpModal } from '../../helper/index'
import SearchSVG from '../../smallComponents/svg/searchSvg';

const Search = ({ 
  horsesWithRaces, 
  input, 
  setInput, 
  filteredHorses, 
  showSearchList,
}) => {

  

  return (
    <div className={s.search_flex}>
      <div className={s.search_box}>
        <div className={s.search_fields}>
          {input.show && <div className={s.field}>
            <label className={s.search_label}>Horse search:</label>
            <input 
              className={s.input}
              onChange={e => setInput({...input, value: e.target.value})}
              value={input.value} 
              type="text" 
              placeholder="Enter horse name" /></div>}

          <div 
            onClick={() => setInput({...input, show: !input.show})}
            className={s.search_btn}>
            Search
            <span><SearchSVG /></span>
        </div>
        </div>

        {showSearchList ? <div className={s.horses_container}>
          <div className={s.search_horses}>

            {filteredHorses
              .map(h => {
              
              return (
                <div key={`${h.horse_uid}_${h.race_instance_uid}`} className={s.horse_feed}>
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