/*eslint-disable*/
import React, { useState } from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import s from '../styles/races.module.css';
import PageHeadline from '../components/pageHeadline';


const Races = props => {
  const [expanded, setExpanded] = useState('10');
  const days = {
    '10': {
      day: "TUESDAY",
      races: [],
    },
    '11': {
      day: "WEDNESDAY",
      races: [],
    },
    '12': {
      day: "THURSDAY",
      races: [],
    },
    '13': {
      day: "FRIDAY",
      races: [],
    },
  }

  
  const races = props.data.allWordpressAcfRace.nodes;
  const page = props.data.wordpressPage;

  const daysWithRaces = races.map(i => i.acf).reduce((object, race, index, array) => {
    let day = +race.race_datetime.split(' ')[1].split('-')[0];
    object[day].races.unshift(race);
    return object
  }, days);

  const navigateToPage = raceid => {
    navigate(`/races/${raceid}`)
  }

  const renderRaces = val => {
    return val.races.map(race => {
      return (
        <div 
          onClick={() => navigateToPage(race.raceid)}
          key={race.title} className={s.racecardBox}>
          <div>
            <div className={s.cardTop}>
              <div className={s.cardLeft}>
                <div className={s.timeAndLocation}>
                  <span>{race.race_datetime.split(' ')[0]}</span>
                </div>
                <div className={s.raceTitle}>
                  {race.title}
                  <span className={s.offer}>Offer</span>                    
                </div>
              </div>
              <div className={s.cardRight}>
                <div className={s.countRunners}>
                  16 runners
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Layout>
      <PageHeadline title={page.acf.heading} subtitle={page.acf.subheading} />

      <div className={s.racesAndAds}>
        <div className={s.racesContainer}>
          <div className={s.daysContainer}>
 
            {Object.entries(days).map(([key, val], index) => {
              return (
                <div key={key}>
                  <div 
                    onClick={() => key === expanded ? setExpanded(null) : setExpanded(key)}
                    className={s.day}>
                    <div className={s.dayLeft}>
                      <div className={`${s.dayImage} ${s[`img${key}`]}`}></div>
                      {val.day}
                    </div>
                    <div className={s.dayRight}>
                      <div className={s.racesLength}>{val.races.length} races</div>
                    </div>
                  </div>

                  {key === expanded ? renderRaces(val) : null}
                </div>
              )
            })}

          </div>
        </div>
        <div className={s.smallAdContainer}></div>
      </div>

      <div className="races_custom_text" dangerouslySetInnerHTML={{__html: page.acf.races_custom_text}}>

      </div>

    </Layout>
  )
}

export default Races;

export const query = graphql`
  {
    allWordpressAcfRace {
      nodes {
        acf {
          title
          raceid
          race_datetime
        }
      }
    }
    wordpressPage(wordpress_id: {eq: 117}) {
      id
      slug
      title
      wordpress_id
          acf {
              heading
              subheading
              races_custom_text
          }
      }
  }
`