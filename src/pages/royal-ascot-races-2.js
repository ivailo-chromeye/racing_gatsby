/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import s from '../styles/races.module.css';
import PageHeadline from '../components/pageHeadline';
import AniLink from "gatsby-plugin-transition-link/AniLink";

import axios from 'axios';
const feedURL = "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/rafeed.json";

const Races = props => {
  const [expanded, setExpanded] = useState('16');
  const [daysRunners, setDaysRunners] = useState({});

  useEffect(() => {
    axios.get(feedURL).then(result => {
      let endObj = {};

      let mappedRunnersLen = result.data.map(day => {
        day.races.map(race => endObj[race.race_instance_uid] = race.API_runners.length);
      });

      setDaysRunners(endObj);

    })
  }, []);

  const days = {
    '16': {
      day: "TUESDAY",
      races: [],
      image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104603/TUESDAY_RACES.jpg",
    },
    '17': {
      day: "WEDNESDAY",
      races: [],
      image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104607/WEDNESDAY_RACES.jpg",
    },
    '18': {
      day: "THURSDAY",
      races: [],
      image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104610/THURSDAY_RACES.jpg",
    },
    '19': {
      day: "FRIDAY",
      races: [],
      image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104614/FRIDAY_RACES.jpg",
    },
    '20': {
      day: "SATURDAY",
      races: [],
      image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104618/SATURDAY_RACES.jpg",
    },
  }

  const races = props.data.allWordpressAcfRace.nodes;
  const page = props.data.wordpressPage;


  const daysWithRaces = races.map(i => i.acf).reduce((object, race, index, array) => {
    let day = race.race_datetime.split('|')[0].split("-")[2];
    object[day].races.unshift(race);
    return object
  }, days);

  const navigateToPage = raceid => {
    navigate(`/races/${raceid}`)
  }

  const renderRaces = val => {
    return val.races.map(race => {
      if(Object.keys(daysRunners).length > 0) {
        race.runnersCount = daysRunners[race.raceid]
      }
      
      return (
        <div 
          onClick={() => navigateToPage(race.raceid)}
          key={race.title} className={s.racecardBox}>
          <div>
            <div className={s.cardTop}>
              <div className={s.cardLeft}>
                <div 
                  
                  className={s.timeAndLocation}>
                  <span>{race.race_datetime.split('|')[1]}</span>
                </div>
                <div className={s.raceTitle}>
                  {race.title}
                  <span className={s.offer}>Offer</span>                    
                </div>
              </div>
              <div className={s.cardRight}>
                <div className={s.countRunners}>
                  {race.runnersCount ? race.runnersCount : null} runners
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
      <PageHeadline 
        title={"ROYAL ASCOT RACECARDS"} 
        subtitle={"36 Royal Ascot races in one place, view the Royal Ascot racecards for each day of the festival"} />

      <div className={s.racesAndAds}>
        <div className={s.racesContainer}>
          <div className={s.daysContainer}>
 
            {Object.entries(days).map(([key, val], index) => {
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

      <div className="races_custom_text" dangerouslySetInnerHTML={{__html: `<h2 dir="ltr">Royal Ascot Day 1</h2>
<p dir="ltr">The first day of Royal Ascot takes place on Tuesday June 16 and kickstarts a magnificent week's racing. If you don't know who to bet on then check out our <a href="https://rp.chromeye.com/royal-ascot/tips/day-1/">Royal Ascot day 1 tips</a>.</p>
<p dir="ltr">The opening race of the five-day meeting is the <a href="https://racingpost.com/royal-ascot/buckingham-palace-handicap/"><strong>Buckingham Palace Handicap</strong></a>, a 7f cavalry charge up the famous Berkshire straight. It’s sure to be one of the most competitive events of the entire week, and the booking of champion jockey Oisin Murphy for Kaeso takes the eye.</p>
<p dir="ltr">The <a href="https://racingpost.com/royal-ascot/queen-anne-stakes/"><strong>Queen Anne Stakes</strong></a> has a long and illustrious history of being won by champion milers. Flat racing legend Frankel was successful at odds of 1-10 in 2012 for Sir Henry Cecil and Tom Queally. In recent years it has been the opening race of the meeting.</p>
<p dir="ltr">Three-year-old middle-distance fillies get their chance to shine in the <a href="https://racingpost.com/royal-ascot/ribblesdale-stakes/"><strong>Ribblesdale Stakes</strong></a> over 1m4f. It often attracts runners who have graduated from the Oaks at Epsom, but not this year as that Classic won’t be staged until July 4.</p>
<p dir="ltr">The <a href="https://racingpost.com/royal-ascot/king-edward-vii-stakes/"><strong>King Edward VII Stakes</strong></a> is a Group 2 over 1m4f which was originally known as the ‘Ascot Derby’. Many horses who contested the premier Classic, the Derby at Epsom, have reappeared in this event. Sir Michael Stoute boasts a magnificent record in the King Edward, having won it seven times.</p>
<p dir="ltr">Sprinters have their first chance of the week to shine in the Group 1 <a href="https://racingpost.com/royal-ascot/kings-stand-stakes/"><strong>King’s Stand Stakes</strong></a> over 5f. Multiple winners have come to the fore in recent years with Blue Point successful in 2018 and 2019 and Sole Power taking the race in 2013 and 2014. Battaash will be one of the hottest favourites of the week to speed to victory this year. Frankie Dettori rides Sceptical.</p>
<p dir="ltr">The <a href="https://racingpost.com/royal-ascot/duke-of-cambridge/"><strong>Duke Of Cambridge Stakes</strong></a> is a Group 2 run over the straight mile for fillies and mares aged four and over. Since its introduction in 2004, Stoute has once again been the trainer to follow, having landed the race four times, most recently with Integral in 2014.</p>
<p dir="ltr">The <a href="https://racingpost.com/royal-ascot/ascot-stakes/"><strong>Ascot Stakes</strong></a> is a 2m4f handicap for stayers. Jumps trainers have a wonderful record in recent years, with the likes of Willie Mullins (four times), Nicky Henderson, David Pipe and Jonjo O’Neill, who are more readily associated with Cheltenham Festival glory, successful in the race since 2010. Three-time champion jockey Ryan Moore has won it three times during that period.</p>

<h2 dir="ltr">Royal Ascot Day 2</h2>
The second day of Royal Ascot takes place on Wednesday 17th June. If you don't know who to bet on then check out our <a href="https://rp.chromeye.com/royal-ascot/tips/day-2/">Royal Ascot day 2 tips</a>.

The opening race is the <strong><a href="https://racingpost.com/royal-ascot/silver-royal-hunt-cup/">Silver Royal Hunt Cup</a></strong>, one of six races added to the programme for Royal Ascot 2020. This is a consolation race for the Royal Hunt Cup, which is run later on the Wednesday card, and like that contest it is a handicap run over the straight mile and open to three-year-olds and above. This gives horses who miss the cut for the Royal Hunt Cup the chance to bid for Royal Ascot glory, although the prize-money of £35,000 is much lower.

The <strong><a href="https://racingpost.com/royal-ascot/hampton-court-stakes/">Hampton Court Stakes</a>,</strong> which has been moved forward a day from its usual Thursday slot, is a Group 3 race for three-year-olds over 1m2f. The £60,000 contest, which joined Royal Ascot as part of the Golden Jubilee celebrations in 2002, will this year serve as a trial for Derby and Oaks hopefuls heading to Epsom in early July. Hawkbill (2016) and Benbatl (2017) are two recent winners who used this race as a stepping stone to Group 1 success.

The <strong><a href="https://racingpost.com/royal-ascot/king-george-v-stakes/">King George V Stakes</a></strong> is a handicap for middle-distance three-year-olds, run over one and a half miles. The inaugural running was in July 1946 and the race was transferred to Royal Ascot in 1948. This race, which moves a day earlier to Wednesday for 2020, tends to favour the bigger stables who have the strength in depth that gives them a better chance of housing the right type of lightly raced three-year-old. One of the best-known recent winners was Brown Panther (2011), a homebred owned by former top footballer Michael Owen.

The feature race on Wednesday is the <strong><a href="https://racingpost.com/royal-ascot/prince-of-wales-stakes/">Prince of Wales’s Stakes</a></strong>, a Group 1 over 1m2f for four-year-olds and upwards. This £250,000 contest is the top-ranked race of Royal Ascot - based on the ratings of the first four finishers - and always one of the highlights of the European season. Last year Crystal Ocean was a typically high-class winner and among the all-time greats to win the race are Brigadier Gerard (1972) and Dubai Millennium (2000). First run at Royal Ascot in 1862, the race was originally named after Queen Victoria's son (later King Edward VII).

The <strong><a href="https://racingpost.com/royal-ascot/royal-hunt-cup/">Royal Hunt Cup</a></strong>, a £75,000 heritage handicap run over the straight mile and open to three-year-olds and above, is one of the biggest betting races of the season. Thirty runners are usually allowed but this year the field has been reduced to a maximum of 24. First run in 1843, this race provided the first of the Queen's 23 winners at Royal Ascot with Choir Boy in 1953 and Her Majesty has won twice more with Alexander (1956) and Colour Sergeant (1992).

The <strong><a href="https://racingpost.com/royal-ascot/windsor-castle-stakes/">Windsor Castle Stakes</a></strong> is a Listed race for two-year-olds over five furlongs, worth £40,000 in prize-money. A trainer to watch is Wesley Ward, who made history in 2009 when Strike The Tiger landed this race to become the first American-trained horse to win at Royal Ascot and scored again with  Hootenanny in 2014. In recent years this has proved the juvenile race most open to a surprise result, with five of the last eight winners priced at 12-1 or above.

The <strong><a href="https://racingpost.com/royal-ascot/copper-horse-handicap/">Copper Horse Stakes</a></strong>, a handicap for four-year-olds and upwards over 1m6f, is one of the six additional races to be run at Royal Ascot in 2020. Worth £35,000, the race is named after The Copper Horse, a statue of King George III mounted on horseback marking the end of the Long Walk in Windsor Great Park, adjacent to the racecourse.
<h2>Royal Ascot Day 3</h2>
<span style="font-weight: 400;">The third day of Royal Ascot on June 25 is traditionally known as Ladies' Day, but for racing enthusiasts Thursday can also be viewed as Ascot Gold Cup day with Flat racing's top stayers taking centre stage. If you don't know who to bet on then check out our</span><a href="https://rp.chromeye.com/royal-ascot/tips/day-3/"> <span style="font-weight: 400;">Royal Ascot day 3 tips</span></a><span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">The opening race this year is the </span><a href="https://racingpost.com/royal-ascot/golden-gates-handicap/"><b>Golden Gates Handicap</b></a><span style="font-weight: 400;">, a new race installed only for the 2020 Royal Ascot meeting run over 1m2f for three-year-olds.</span>

<span style="font-weight: 400;">In recent years, the 1m2f</span><a href="https://racingpost.com/royal-ascot/wolferton-stakes/"> <b>Wolferton Stakes</b></a> <span style="font-weight: 400;">has become a top-quality race and 2020's renewal looks likely to provide a similar billing. Addeybb won this last season before going on to two top-level wins in Australia.</span>

<span style="font-weight: 400;">The Group 3</span><a href="https://racingpost.com/royal-ascot/jersey-stakes/"> <b>Jersey Stakes</b></a><span style="font-weight: 400;">, for three-year-olds, has been used as a launchpad for top-class performers Ribchester and Expert Eye and this year's 7f event features plenty of excellent prospects. The 2,000 Guineas sixth Kinross and the unbeaten King Leonidas are among some interesting runners.</span>

<span style="font-weight: 400;">The exceptional Pinatubo exploded on to the scene in the </span><a href="https://racingpost.com/royal-ascot/chesham-stakes/"><b>Chesham Stakes</b><span style="font-weight: 400;">,</span></a><span style="font-weight: 400;"> for two-year-olds and run over 7f, and Charlie Appleby will look for a similar result with Modern News. The son of Shamardal was an impressive winner on debut at Newmarket.</span>

<span style="font-weight: 400;">The Group 1</span><a href="https://racingpost.com/royal-ascot/ascot-gold-cup/"> <b>Ascot</b> <b>Gold Cup</b></a><span style="font-weight: 400;"> is the feature race on the Thursday of Royal Ascot. Run over the stamina-sapping 2m4f, Stradivarius is out for a third consecutive victory in the race looking to join the immortals of the meeting. He could match Sagaro with a third win, but would still be trailing the brilliant Yeats who enjoyed four wins in the race.</span>

<span style="font-weight: 400;">All of the leading yards are looking for a slice of the £60,000 </span><a href="https://racingpost.com/royal-ascot/britannia-stakes/"><b>Britannia Stakes</b></a><span style="font-weight: 400;">, a mile handicap for three-year-old colts and geldings. It has proved a tricky race for punters with a 28-1 and 25-1 winner in two of the last three years. Acquitted currently heads the betting.</span>

<span style="font-weight: 400;">Thursday at Royal Ascot finishes with the</span> <a href="https://racingpost.com/royal-ascot/sandringham-stakes/"><b>Sandringham Stakes</b></a><span style="font-weight: 400;">, raced over a mile for three-year-old fillies. The handicap is another competitive heat for punters and this year's race features fancied runners for John Gosden and Sir Michael Stoute.</span>
<h2>Royal Ascot Day 4</h2>
The fourth day of Royal Ascot takes place on Friday 19th June. If you don't know who to bet on then check out our <a href="https://rp.chromeye.com/royal-ascot/tips/day-4/">Royal Ascot day 4 tips</a>.

<span style="font-weight: 400;">The opening race on Friday is the </span><a href="https://racingpost.com/royal-ascot/palace-of-holyroodhouse-handicap/"><b>Palace Of Holyroodhouse Handicap</b></a><span style="font-weight: 400;">, a five-furlong event added to the race programme this year to offer an opportunity for three-year-old sprint handicappers to enjoy a moment in the sun at the royal meeting. Band Practice, a three-time winner last season for trainer Archie Watson, is the joint highest-rated contender in the field off a handicap mark of 104.</span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/albany-stakes/"><b>Albany Stakes</b></a><span style="font-weight: 400;"> is a six-furlong Group 3 race for two-year-old fillies. It was won last season by Daahyeh, a top-class filly who subsequently finished second twice in Group 1 company. Her trainer Roger Varian seeks a third victory in the race this year and will be doubly represented by Setarhe and Undertake, two impressive debut winners since the resumption of British racing. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/norfolk-stakes/"><b>Norfolk Stakes</b></a><span style="font-weight: 400;"> is a five-furlong Group 2 contest for speedy two-year-old colts. It was landed in memorable style in 2013 by US trainer Wesley Ward’s representative No Nay Never, now a top-class sire of similarly rapid progeny. Ward also saddled Shang Shang Shang to win the Norfolk in 2018. This year the trainer is reliant on Golden Pal to enhance his fine record in the event. </span>

<span style="font-weight: 400;">Eligible to four-year-olds or above, the </span><a href="https://racingpost.com/royal-ascot/hardwicke-stakes/"><b>Hardwicke Stakes</b></a><span style="font-weight: 400;"> is a one mile and four-furlong Group 2 contest with a classy roll of honour. Sir Michael Stoute has dominated the race with five victories in the last eight years including in 2018 with the top-class Crystal Ocean, a dual Royal Ascot winner who followed up in the Prince of Wales’s Stakes last season. Defoe scored in the Hardwicke last season and is pencilled in for a repeat bid this year.</span>

<span style="font-weight: 400;">Introduced to the programme in 2015, the </span><a href="https://racingpost.com/royal-ascot/commonwealth-cup/"><b>Commonwealth Cup</b></a><span style="font-weight: 400;"> has been a popular addition to the Royal Ascot schedule. It is a Group 1 race for three-year-old colts run over six furlongs and its 2017 running was particularly special. The Aidan O’Brien-trained Caravaggio denied future top-level winner Harry Angel and Blue Point, a horse steeped in Royal Ascot prestige after securing a historic double in the King’s Stand Stakes and Diamond Jubilee Stakes last season. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/queens-vase/"><b>Queen’s Vase</b></a><span style="font-weight: 400;"> is a Group 2 contest for three-year-old staying horses run over one mile and six furlongs. The race was shortened in distance from its previous trip of two miles in 2017, a race where Stradivarius bagged his first triumph at the meeting before scooping the Gold Cup in successive seasons. Aidan O’Brien’s 2018 winner Kew Gardens went on to win the St Leger and the race has a rich history of producing top stayers. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/duke-of-edinburgh-stakes/"><b>Duke of Edinburgh Stakes</b></a><span style="font-weight: 400;"> is a one mile and four-furlong handicap for three-year-olds and above. It brings the curtain down on Friday’s racing at Royal Ascot. The past two winners of the competitive contest have been well-supported 7-2 favourites, with Baghdad obliging in 2019 and Dash Of Spice in 2018. The joint highest-rated this season is El Misk. The progressive colt represents the powerful John Gosden stable and legendary rider Frankie Dettori has been booked to ride.</span>
<h2>Royal Ascot Day 5</h2>
<span style="font-weight: 400;">The final day of Royal Ascot takes place on Saturday June 20. Unlike the first four days, there will be eight races rather than seven, including the </span><b><a href="https://racingpost.com/royal-ascot/silver-wokingham-handicap/">Silver Wokingham Handicap</a>.</b><span style="font-weight: 400;"> This 6f contest for horses three-years-old or older is new for this year only and is a consolation race for the Wokingham Handicap, which is run as the penultimate race on the card. If you don't know who to bet on then check out our <a href="https://rp.chromeye.com/royal-ascot/tips/day-5/">Royal Ascot day 5 tips</a>.</span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/queen-mary-stakes/"><b>Queen Mary Stakes </b></a><span style="font-weight: 400;">is run over the minimum trip of 5f and is the first major race of the season exclusively for two-year-old fillies. The race was named after the consort of King George V and was first run in 1921. It has been won by a number of top sprinters in the last decade, such as Raffle Prize, who scored last year under top jockey Frankie Dettori.</span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/coronation-stakes/"><b>Coronation Stakes </b></a><span style="font-weight: 400;">is for three-year-old fillies and is run over a mile. It regularly attracts horses that have run in the British, Irish and French 1,000 Guineas. The race is usually run a day earlier but due to the suspension of racing it has been moved to the final day to give participating fillies more time between the two. It is a Group 1 and has been won by three French-trained runners in the last five years, including the Watch Me last year. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/coventry-stakes/"><b>Coventry Stakes </b></a><span style="font-weight: 400;">is a Group 2 run over six furlongs and it is traditionally the first Group contest of the year for juveniles but it has been moved from the opening day of Royal Ascot. Many top-class horses have won this race before going on to achieve greatness, including Dawn Approach, who won this race in 2012 before landing the 2,000 Guineas the following year. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/st-james-palace-stakes/"><b>St James's Palace Stakes </b></a><span style="font-weight: 400;">is the second Group 1 on the card and is restricted to three-year-old colts. It features the best milers from the Classic generation, often attracting horses that have run in the British, French and Irish 2,000 Guineas. Aidan O'Brien has won this contest a record eight times and struck last year with Circus Maximus, winner of the Prix Du Moulin at Longchamp last October. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/diamond-jubilee-stakes/"><b>Diamond Jubilee Stakes </b></a><span style="font-weight: 400;">is a six-furlong sprint for horses four-years-old or older. It was elevated to Group 1 status in 2002 and is the meeting's most prestigious sprint. Last year it was won by Blue Point, who had achieved the rare feat of winning the King's Stand Stakes earlier in the week. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/wokingham-stakes/"><b>Wokingham Handicap </b></a><span style="font-weight: 400;">is run over six furlongs for horses who are three-years-old or older. The inaugural running of this famous sprint took place in 1813, making it the oldest handicap at Royal Ascot. Over the years, the race has developed a reputation as a fiercely competitive handicap and is one of the major betting heats of the season. </span>

<span style="font-weight: 400;">The </span><a href="https://racingpost.com/royal-ascot/queen-alexandra-stakes/"><b>Queen Alexandra Stakes </b></a><span style="font-weight: 400;">is run over the marathon trip of 2m6f and is restricted to older horses. It is not only the longest race of the meeting but also the longest race of the meeting but also the longest contest in Flat racing. It will always be associated with Brown Jack, one of Royal Ascot's greatest performers, who won this race six times in a row between 1929 and 1934. </span>`}}>

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