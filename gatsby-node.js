const axios = require("axios");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const feed = await axios.get(
    "https://s3.eu-west-2.amazonaws.com/racipngpost.json.data.lambda/feed.json"
  )

  return graphql(`
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
    }
  `).then(async result => {
    const races = result.data.allWordpressAcfRace

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
