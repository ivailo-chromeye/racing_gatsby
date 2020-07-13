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
  getRaceMap,
} = require("./raceFunctions");




exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // const feed = await axios.get(
  //   "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  // );
  const ascotFeed = (await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/RA/feed.json"
  )).data;

  const flatRaces = getFlatRaces(ascotFeed);
  const racesMenu = getRacesMenu(ascotFeed);
  const horsesWithRaces = getHorsesWithRaces(ascotFeed); 
  const raceMap = await getRaceMap(ascotFeed);

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
        const wpRace = wpRaces.find(wprace => wprace.acf.raceid == race.race_instance_uid);

        //race_instance_uid: 758810,
        //"https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/RA/race/758728.json";

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
            finished: race.finished,
            richFeed: raceMap[race.race_instance_uid],
          },
        });

        createPage({
          path: `/races/${race.race_instance_uid}/odds/`,
          component: require.resolve(`./src/templates/raceOdds`),
          context: {
            componentName: "odds",
            richFeed: raceMap[race.race_instance_uid],
          }
        });

        createPage({
          path: `/races/${race.race_instance_uid}/tips/`,
          component: require.resolve(`./src/templates/raceTips`),
          context: {
            componentName: "tips",
            richFeed: raceMap[race.race_instance_uid],
          }
        });
      }) // end of flatRaces forEach
  })
}
