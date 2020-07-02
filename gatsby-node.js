const axios = require("axios")
const { pick } = require("lodash")
const data = require("./data")
const runners = require('./runners.json')
const { 
	runnerFields,
	numberWithCommas,
	months,
	dateObj,
	distanceObj,
} = require("./utility");

// race functions
const {
  getFlatRaces,
  getRacesMenu,
  getSingleRaceRunners,
  getHorsesWithRaces,
} = require("./raceFunctions");




exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // const feed = await axios.get(
  //   "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  // );
  const ascotFeed = (await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/rafeed.json"
  )).data;

  const flatRaces = getFlatRaces(ascotFeed);
  const racesMenu = getRacesMenu(ascotFeed);
  const horsesWithRaces = getHorsesWithRaces(ascotFeed);
  

  const runnersArray = [];

  for (let key in runners.runners) {
    runnersArray.push(pick(runners.runners[key], runnerFields))
  }

  await graphql(`
    {
      allWordpressWpRace {
        nodes {
          slug
          acf {
            title
            raceid
            race_datetime
            custom_text
            racing_post_tip_dropdown
            key_race_stats
            what_happened_last_year
            distance_yard
            race_class
            rp_ages_allowed_desc
          }
        }
      }
    }
  `).then(async result => {
    
    
    //
    // Create Races Page //
    //
    createPage({
      path: `/races/`,
      component: require.resolve(`./src/templates/races.js`),
      context: {
        racesMenu,
        horsesWithRaces,
      }
    });
  

    // console.log(races);

    // Create Page for Every Race
    // races.nodes.forEach(race => {
      // console.log(race);

      const wpRaces = result.data.allWordpressWpRace.nodes
      
      flatRaces.forEach(race => {
        // comparing str and num.......==........................
        const wpRace = wpRaces.find(wprace => wprace.acf.raceid == race.race_instance_uid)

        console.log({race});

        createPage({
          path: `/races/${race.race_instance_uid}/`,
          component: require.resolve(`./src/templates/race.js`),
          context: {
            wpRace,
            racesMenu,
            raceid: race.race_instance_uid,
            raceTime: race.race_time_diffusion,
            raceDate: race.race_datetime.split("T")[0],
            horsesWithRaces,
            runners: race.API_runners,
            finished: race.finished,
            // race: race.acf,
            // feed: JSON.stringify(feed.data),
            // ascotFeed: JSON.stringify(ascotFeed.data),
            // runners: JSON.stringify(runnersArray),
            // data: JSON.stringify(data),
          },
        })
      })
      




    // })
  })
}
