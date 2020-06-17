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
} = require("./utility")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const feed = await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  );

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
    const races = result.data.allWordpressWpRace



    // console.log(races);

    // Create Page for Every Race
    races.nodes.forEach(race => {
      createPage({
        path: `/races/${race.acf.raceid}/tips/`,
        component: require.resolve(`./src/templates/raceTips.js`),
        context: {
          race: race.acf,
          feed: JSON.stringify(feed.data),
          runners: JSON.stringify(runnersArray),
          data: JSON.stringify({
            racecard: {
              race_datetime: dateObj,
              distance: distanceObj,
              course_style_name: "Gulfstream Park",
              prize: numberWithCommas(9473.68),
              race_instance_title:
                "Claiming Race (3yo+ Fillies & Mares) (Turf)",
              rp_ages_allowed_desc: "3yo+",
              no_of_runners: 10,
              going_type_desc: "Firm",
              rp_stakes: 15789.47,
            },
          }),
        },
      })

      // console.log(race);

      createPage({
        path: `/races/${race.acf.raceid}/odds/`,
        component: require.resolve(`./src/templates/raceOdds.js`),
        context: {
          race: race.acf,
          feed: JSON.stringify(feed.data),
          runners: JSON.stringify(runnersArray),
          data: JSON.stringify({
            racecard: {
              race_datetime: dateObj,
              distance: distanceObj,
              course_style_name: "Gulfstream Park",
              prize: numberWithCommas(9473.68),
              race_instance_title:
                "Claiming Race (3yo+ Fillies & Mares) (Turf)",
              rp_ages_allowed_desc: "3yo+",
              no_of_runners: 10,
              going_type_desc: "Firm",
              rp_stakes: 15789.47,
            },
          }),
        },
      })

      createPage({
        path: `/races/${race.acf.raceid}/`,
        component: require.resolve(`./src/templates/race.js`),
        context: {
          race: race.acf,
          feed: JSON.stringify(feed.data),
          runners: JSON.stringify(runnersArray),
          data: JSON.stringify(data),
        },
      })
    })
  })
}
