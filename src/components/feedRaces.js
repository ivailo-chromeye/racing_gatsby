import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/homeTabs.css';
import st from '../styles/racecards.module.css';

import MiniRaceCard from "../components/miniRaceCard"
import SectionTitleComponent from "../components/sectionTitle"

const FeedRaces = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [feedItems, setFeedItems] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);


    useEffect(() => {
        fetch("https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/test.json")
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

    function handleSelected(index)  {
      setTabIndex(index)
    }

    const tabsDays = ['Friday', 'Saturday', 'Sunday', 'Monday']

    function sideScroll(element,direction,speed,distance,step){
      var scrollAmount = 0;
      var slideTimer = setInterval(function(){
          if (direction == 'left') {
              element.scrollLeft -= step;
          } else {
              element.scrollLeft += step;
          }
          scrollAmount += step;
          if (scrollAmount >= distance) {
              window.clearInterval(slideTimer);
          }
      }, speed);
    }
    
    function slideRight (event) {
        sideScroll(event.currentTarget.parentElement,'right',25,150,10);
    }
    function slideLeft (event) {
        sideScroll(event.currentTarget.parentElement,'left',25,150,10);
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <SectionTitleComponent title={'Races'}/>
        <Tabs onSelect={handleSelected} selectedIndex={tabIndex}>
          <TabList>
            {tabsDays.map(day => {
                return (
                  <Tab key={day}>{day}</Tab>
                )
            })}
          </TabList>

          {feedItems.map(day => {
              return (
                <div key={day.race_date} style={{position: 'relative'}}>
                  <TabPanel className={[st.racecardsWrapper, 'scrollit'].join(' ')}>
                    <button onClick={slideLeft} className={st.slidePrev} type="button"></button>
                    {
                      day.races.map(race => {
                        return (
                            <MiniRaceCard key={race.race_instance_uid} {...race}/>
                        )
                      })
                    }
                    <button onClick={slideRight} className={st.slideNext} type="button"></button>
                    </TabPanel>
                  </div>
              )
          })}
        </Tabs>
        </>
      );
    }
}

export default FeedRaces