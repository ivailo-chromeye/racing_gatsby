/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import Layout from "../layout";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import s from "./races.module.css";
import PageHeadline from '../pageHeadline';
import AniLink from "gatsby-plugin-transition-link/AniLink";
// import WideBanner from '../WideBannerIframe'
// import WideBanner2 from '../WideBannerIframe2'


const Races = props => {
  const [expanded, setExpanded] = useState('16');
  const { racesMenu } = props.pageContext;
  console.log({racesMenu, isarray: Array.isArray(racesMenu)});


  const navigateToPage = raceid => {
    navigate(`/races/${raceid}`)
  }

  const renderRaces = list => {
    return list.map(race => {
      return (
        <div 
          onClick={() => navigateToPage(race.race_instance_uid)}
          key={race.race_instance_uid} className={s.racecardBox}>
          <div>
            <div className={s.cardTop}>
              <div className={s.cardLeft}>
                <div 
                  
                  className={s.timeAndLocation}>
                  <span>{race.race_time_diffusion}</span>
                </div>
                <div className={s.raceTitle}>
                  {race.race_instance_title}
                  <span className={s.offer}>Offer</span>                    
                </div>
              </div>
              <div className={s.cardRight}>
                <div className={s.countRunners}>
                  {race.runnersLen} runners
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
      <div className={s.main}>
      <PageHeadline 
        title={"ROYAL ASCOT RACECARDS"} 
        subtitle={"36 Royal Ascot races in one place, view the Royal Ascot racecards for each day of the festival"} />

      <div className={s.racesAndAds}>
        <div className={s.racesContainer}>
          <div className={s.daysContainer}>
 
            {Object.entries(racesMenu).map(([key, val], index) => {
              console.log({key,val});
              return (
                <div key={key}>
                  <div 
                    onClick={() => key === expanded ? setExpanded(null) : setExpanded(key)}
                    className={s.day}>
                    <div 
                      className={s.dayLeft}>
                      <div 
                        style={{background: `url(${val.image})`}}
                        className={`${s.dayImage} ${s[`img${key}`]}`}></div>
                      {val.racesPageLabel}
                    </div>
                    <div className={s.dayRight}>
                      <div className={s.racesLength}>{val.list.length} races</div>
                    </div>
                  </div>

                  {key === expanded ? renderRaces(val.list) : null}
                </div>
              )
            })}

          </div>
        </div>
        <div className={s.smallAdContainer}>
          {/* <WideBanner2 /> */}
        </div>
      </div>

      {/* <WideBanner /> */}
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