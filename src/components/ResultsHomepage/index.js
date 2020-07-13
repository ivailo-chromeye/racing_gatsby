import React, { useState, useEffect } from 'react'
import st from './styles.module.scss';

import SectionTitle from "../SectionTitle"

import { LazyLoadImage } from 'react-lazy-load-image-component';

const ResultsHomepage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [feedItems, setFeedItems] = useState([]);

    useEffect(() => {
        fetch("https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/rafeed.json")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setFeedItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])


    const feedOutput = []
    feedItems.forEach(day => {
        console.log(day)
        day.races.forEach(race => {
            if (race.finished) {
              feedOutput.push(race)
            }
        })
    })

    // console.log(feedOutput.slice(Math.max(feedOutput.length - 6, 0)))

    const printResults = feedOutput.slice(Math.max(feedOutput.length - 6, 0))

    console.log(printResults)

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <SectionTitle margin={0} title={'Royal Ascot Results'}/>
        <div className={st.resultsWrap}>
          {printResults.map(race => {
              if (race.fast_results) {
                return (
                  <div className={st.race}>
                    <div className={st.raceTop}>
                        <p className={st.raceTime}>{race.race_time_diffusion}</p>
                        <p className={st.raceName}>{race.race_instance_title}</p>
                    </div>
                    <div className={st.runners}>
                      {race.fast_results.map(runner => {
                        return (
                            <div className={st.runner}>
                                <h6>{runner.pos}</h6>
                                <LazyLoadImage alt={'Silk'} src={runner.silk_image_png}/>
                                {/* <img src={runner.silk_image_png}/> */}
                                <div>
                                    <h3>{runner.horse_name}</h3>
                                    <p>{runner.jockey_name}</p>
                                </div>
                            </div>
                        )
                      })}
                    </div>
                    <a target="_blank" className={st.resultBtn} href={'https://www.racingpost.com/results/2/ascot/' + race.race_datetime.substring(0, 10) + '/' + race.race_instance_uid}>View Full Result</a>
                  </div>
                )
              }
              // "https://www.racingpost.com/results/2/ascot/2020-06-17/758754/"
          })}
          </div>
        </>
      );
    }
}

export default ResultsHomepage