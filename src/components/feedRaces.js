import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/homeTabs.css';
import st from '../styles/racecards.module.css';

import MiniRaceCard from "../components/miniRaceCard";
import SectionTitle from "../components/SectionTitle";

// import diffusion from "rp-diffusion";

const FeedRaces = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [feedItems, setFeedItems] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);


    useEffect(() => {
        fetch("https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/rafeed.json")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              setIsLoaded(true);
              setFeedItems(result);
              setTabIndex(3)
            },
            (error) => {
              console.log(error)
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

      useEffect(() => {
        window.diffusion.connect({
          host:		'push-cards.racingpost.com',
          port:		443
        }).then(
          function(session) {
            let odds = document.getElementsByClassName('pull-odd');
      
            for (let index = 0; index < odds.length; ++index) {
              odds[index].setAttribute("id", "dfo" + index)
              let id = odds[index].getAttribute('id');
              let topic = odds[index].getAttribute('data-topic');
              let eachway = odds[index].getAttribute('data-ew');
                        
              if (eachway) {
                  session.subscribe(eachway).transform(String).on('update', function(value) {
                      var data = [value.split('\u0002')[0], value.split('\u0002')[1]]
                      document.getElementById(id).setAttribute('data-ewdata', value.split('\u0002')[0])
                  });
              }
      
              var horseNameInTopic = topic.split('/')
              if (horseNameInTopic[5]) {
                session.subscribe(topic).transform(String).on('update', function(value) {
                  var arr = value.split('\u0002')
                  var outcomeID = arr[1]
                  var eventID = arr[4]
                  var meetingID = arr[3]
                  var odds = arr[7]
                  var decOdds = arr[8]
                  var decOddsHist = arr[14]
      
                  var bookies = {
                    'WH_OXI' : {
                      'url': `http://sports.williamhill.com/bet/EN/addtoslip?action=BuildSlip&price=y&ew=n&sel=${(outcomeID) ? outcomeID : 'xxx'}&ustake=5&url=http://sports.williamhill.com/bet/en/betting/e/${(eventID) ? eventID : 'xxx'}`,
                      'multiple': `&sel=id|${ (outcomeID) ? outcomeID : 'xxx'}`
                    },
                    'LADB' : {
                      'url': `https://betslip.ladbrokes.com/RemoteBetslip/bets/betslip.html?selections=${(outcomeID) ? outcomeID : 'xxx'}&aff-link=https://partners.ladbrokes.com/C.ashx?btag=718840&affid=104300&siteid=718840&adid=936&c=`,
                      'multiple': `${ (outcomeID) ? outcomeID : 'xxx'}`
                    },
                    'BET365' : {
                      'url': `https://www.bet365.com/dl/sportsbookredirect?affiliate=365_00929318&bs=${(eventID) ? eventID : 'xxx'}-${(outcomeID) ? outcomeID : 'xxx'}~${(odds) ? odds : 'xxx'}&bet=1`,
                      'multiple': `${(eventID) ? eventID : 'xxx'}-${(outcomeID) ? outcomeID : 'xxx'}~${(odds) ? odds : 'xxx'}`
                    },
                    'CORAL' : {
                      'url': `https://sports.coral.co.uk/betslip/add/${(outcomeID) ? outcomeID : 'xxx'}?&id=N&member=incomeaccess&profile=1sbxm10000&creferer=BTAG:8113`,
                      'multiple': `${(outcomeID) ? outcomeID : 'xxx'}`
                    },
                    'PADDYPOWER' : {
                      'url': `https://media.paddypower.com/redirect.aspx?pid=12761567&bid=7125&redirectURL=https://www.paddypower.com/?action=addLegs&leg=${(meetingID) ? meetingID : 'xxx'}|${(outcomeID) ? outcomeID : 'xxx'}|SIMPLE_SELECTION|`,
                      'multiple': `&leg=${(meetingID) ? meetingID : 'xxx'}|${(outcomeID) ? outcomeID : 'xxx'}|SIMPLE_SELECTION|`
                    },
                    'BETWAY' : {
                      'url': `https://sports.betway.com/outcomes/${(outcomeID) ? outcomeID : 'xxx'}?s=bw39549&a=affiliate_id`,
                      'multiple': `${(outcomeID) ? outcomeID : 'xxx'}`
                    },
                    'BETFAIR' : {
                      'url': `https://www.betfair.com/sport/home/?modules=betslip&action=addAffiliateSelections&bssId=${(outcomeID) ? outcomeID : 'xxx'}&bsmId=${(meetingID) ? meetingID : 'xxx'}&pid=3707831&bid=10793`,
                      'multiple': `${(outcomeID) ? outcomeID : 'xxx'}|${(meetingID) ? meetingID : 'xxx'}`
                    },
                    'UNIBET' : {
                      'url': `https://www.unibet.co.uk/racing#/event/${(eventID) ? eventID : 'xxx'}?pid=31476271&bid=29335`,
                      'multiple': `${(eventID) ? eventID : 'xxx'}`
                    },
                    'SURREY' : {
                      'url': `http://m.skybet.com/go/event/${(eventID) ? eventID : 'xxx'}/bet?sels=${(outcomeID) ? outcomeID : 'xxx'}&a=30665`,
                      'multiple': `${(outcomeID) ? outcomeID : 'xxx'}`
                    },
                    'BOLEYSPORTS' : {
                      'url': `https://www.boylesports.com/betting/`,
                    },
                    'RB' : {
                      'url': `https://www.racebets.com/en/horse-racing/`,
                    }
                  }
      
                  var bookie = document.getElementById(id).getAttribute('data-bookie')
                  
                  if (odds) {
                    
                      document.getElementById(id).innerHTML = odds;
                    
                  }
                });
              }
            }
          })
      }, [tabIndex])



    function handleSelected(index)  {
      setTabIndex(index)
    }

    const tabsDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
        <SectionTitle margin={0} title={'Royal Ascot Races'}/>
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
                            <MiniRaceCard key={race.race_instance_uid} race={race} raceDateDiffusion={day}/>
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