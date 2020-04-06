const axios = require("axios");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const feed = await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  );
  

  // const horses = {};

  // for (let key in feed) {
  //   let day = feed[key];
  //   let races = day.races;
  //   console.log(day);
  //   races.forEach(race => {
  //     let runners = race.API_runners;
  //     runners.forEach(runner => {
  //       let horse_uid = runner.horse_uid;
  //       let horse_name= runner.horse_name;

  //       console.log(horse_uid !== undefined)

  //       horses[horse_uid] = {horse_uid, horse_name}

  //     })
  //   })
  // }

  await graphql(`
    {
      allWordpressWpHorse {
        totalCount
        nodes {
          acf {
            horse_name
            horse_uid
          }
        }
      }
      allWordpressAcfRace {
        nodes{
          acf {
            title
            raceid
            race_datetime
          }
        }
      }
    }
    `).then(async result => {
      const races = result.data.allWordpressAcfRace;

      //const feed = await axios.get("https://jsonplaceholder.typicode.com/posts")

      // Create Page for Every Race
      races.nodes.forEach(race => {
        createPage({
          path: `/races/${race.acf.raceid}`,
          component: require.resolve(`./src/templates/race.js`),
          context: {
            race: race.acf,
            feed: JSON.stringify(feed.data),
          },
        });
      });
    });
}
