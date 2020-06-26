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
            past_10_winners
          }
        }
      }
    }
  `).then(async result => {
    // const races = result.data.allWordpressWpRace
    
    //
    // Create Races Page //
    //
    createPage({
      path: `/races/`,
      component: require.resolve(`./src/templates/races.js`),
      context: {
        racesMenu,
      }
    });
  

    // console.log(races);

    // Create Page for Every Race
    // races.nodes.forEach(race => {
      // console.log(race);
      
      flatRaces.forEach(race => {
        createPage({
          path: `/races/${race.race_instance_uid}/`,
          component: require.resolve(`./src/templates/race.js`),
          context: {
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
