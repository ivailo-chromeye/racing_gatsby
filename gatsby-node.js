const axios = require("axios")
const { pick } = require("lodash")
const data = require("./data")
const runners = require("./runners.json")
const {
  runnerFields,
  numberWithCommas,
  months,
  dateObj,
  distanceObj,
} = require("./utility")

// race functions
const {
  getFlatRaces,
  getRacesMenu,
  getSingleRaceRunners,
  getHorsesWithRaces,
  getRaceMap,
} = require("./raceFunctions")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const ascotFeed = (
    await axios.get(
      "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/RA/feed.json"
    )
  ).data

  const flatRaces = getFlatRaces(ascotFeed)
  const racesMenu = getRacesMenu(ascotFeed)
  const horsesWithRaces = getHorsesWithRaces(ascotFeed)
  const raceMap = await getRaceMap(ascotFeed)

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
            racingpost_tip_text
            racingpost_tip_show
            race_preview_text
          }
        }
      }
    }
  `).then(async result => {
    const wpRaces = result.data.allWordpressWpRace.nodes

    //
    // Create Races Page //
    //
    createPage({
      path: `/races/`,
      component: require.resolve(`./src/templates/races.js`),
      context: {
        racesMenu,
        horsesWithRaces,
      },
    })

    //
    // Create Betting odds page https://rp.chromeye.com/royal-ascot/betting-odds/
    //
    createPage({
      path: `/royal-ascot-betting-odds/`,
      component: require.resolve(`./src/templates/BettingOdds.js`),
      context: {
        racesMenu,
        flatRaces,
      },
    });

    //
    // https://www.racingpost.com/royal-ascot/tips/day-1/
    // https://www.racingpost.com/royal-ascot/tips/day-2/
    // etc
    //
    Object.entries(racesMenu).forEach(([day, dayObject], index, array) => {
      const dayNumber = index + 1;

      const wpRacesForThisDay = wpRaces.filter(wprace => {
        console.log({day, split: wprace.acf.race_datetime.split("|")[0]});
        return day === wprace.acf.race_datetime.split("|")[0]
      });

      console.log({wpRacesForThisDay});

      createPage({
        path: `/royal-ascot/tips/day-${index + 1}/`,
        component: require.resolve(`./src/templates/TipsDay.js`),
        context: {
          wpRaces: wpRacesForThisDay,
          dayObject,
          dayNumber,
          daysNav: Array.from({length: array.length}),
        },
      });
    });

    
    flatRaces.forEach(race => {
      // comparing str and num.......==........................
      const wpRace = wpRaces.find(
        wprace => wprace.acf.raceid == race.race_instance_uid
      )

      raceDate = race.race_datetime.split("T")[0]

      // Single race
      createPage({
        path: `/races/${race.race_instance_uid}/`,
        component: require.resolve(`./src/templates/race.js`),
        context: {
          wpRace,
          racesMenu,
          raceid: race.race_instance_uid,
          raceTime: race.race_time_diffusion,
          raceDate,
          horsesWithRaces,
          finished: race.finished,
          richFeed: raceMap[race.race_instance_uid],
        },
      })

      // Odds
      createPage({
        path: `/races/${race.race_instance_uid}/odds/`,
        component: require.resolve(`./src/templates/raceOdds`),
        context: {
          raceid: race.race_instance_uid,
          raceTime: race.race_time_diffusion,
          raceDate,
          componentName: "odds",
          richFeed: raceMap[race.race_instance_uid],
        },
      })

      // Tips
      createPage({
        path: `/races/${race.race_instance_uid}/tips/`,
        component: require.resolve(`./src/templates/raceTips`),
        context: {
          raceid: race.race_instance_uid,
          raceTime: race.race_time_diffusion,
          raceDate,
          componentName: "tips",
          richFeed: raceMap[race.race_instance_uid],
        },
      })
    }) // end of flatRaces forEach
  })
}
