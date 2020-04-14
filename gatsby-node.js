const axios = require("axios");
const fs = require('fs').promises;

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const feed = await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  );

  // const runnersFields =  [
  //   "start_number", "figures", 
  //   "horse_uid", "horse_name", "horse_age",
  //   "jockey_uid", "jockey_name",
  //   "trainer_id", "trainer_stylename",
  //   "spotlight",
  //   "silk_image_path",
  // ];
  // const pick = (obj, ...keys) => Object.fromEntries(
  //   Object.entries(obj)
  //   .filter(([key]) => keys.includes(key))
  // );

  // const getMockRunners = async() => {

  //   const mockRunners = Object.values(
  //     (JSON.parse(await fs.readFile('rp_api/runners.json', 'utf8')))['runners']
  //   );

  //   return mockRunners.map(runner => {
  //     const subset = pick(runner, ...runnersFields); 
  //     // assign default values for testing.
  //     subset['wgt'] = '11-7';
  //     subset['rpr'] = 158;
  //     subset['or'] = 153;

  //     return subset;
  //   });

  // }


  // const mockRunners = await getMockRunners();

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
            // mockRunners: JSON.stringify(mockRunners),
          },
        });
      });
    });
}
