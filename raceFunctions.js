// Here we add global data.
//
const axios = require("axios");

const days = {
  '2020-06-16': {
    image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104603/TUESDAY_RACES.jpg",
    menuLabel: "Tuesday's Races",
    racesPageLabel: "TUESDAY",
    list: [],
  },
  '2020-06-17': {
    image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104607/WEDNESDAY_RACES.jpg",
    menuLabel: "Wednesday's Races",
    racesPageLabel: "WEDNESDAY",
    list: [],
  },
  '2020-06-18': {
    image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104610/THURSDAY_RACES.jpg",
    menuLabel: "Thursday's Races",
    racesPageLabel: "THURSDAY",
    list: [],
  },
  '2020-06-19': {
    image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104614/FRIDAY_RACES.jpg",
    menuLabel: "Friday's Races",
    racesPageLabel: "FRIDAY",
    list: [],
  },
  '2020-06-20': {
    image: "https://s3-eu-west-2.amazonaws.com/racingpost-web/wp-content/uploads/sites/6/20200609104618/SATURDAY_RACES.jpg",
    menuLabel: "Saturday's Races",
    racesPageLabel: "SATURDAY",
    list: [],
  },
}

// all races array - for generating dynamic pages
// and passing runners to each page
const getFlatRaces = feed => {
  return feed.reduce((accumulator, day) => [...accumulator, ...day.races], [])
}

// getRacesMenu - for anywhere where we need to list all the races
const getRacesMenu = feed => {
  return feed.reduce((accumulator, day) => {
    accumulator[day.race_date_diffusion]['list'] = day.races.map(race => {

      return ({
        race_instance_title: race.race_instance_title,
        race_instance_uid: race.race_instance_uid,
        race_time_diffusion: race.race_time_diffusion,
        finished: race.finished, 
        runnersLen: race.API_runners.length,
      });

    });

    return accumulator;

  }, days);
}

// only 1 race
const getSingleRaceRunners = (racesArray, raceID) => {
  return racesArray.find(race => race.race_instance_uid === raceID); // num
}

const getHorsesWithRaces = feed => {
  const horsesWithRaces = [];
  feed.map(day => {
    day.races.map(race => {
      race.API_runners.map(runner => {
        horsesWithRaces.push({
          date: day.race_date_diffusion,
          race_instance_title: race.race_instance_title,
          race_instance_uid: race.race_instance_uid,
          horse_name: runner.horse_name,
          horse_uid: runner.horse_uid,
        })
      })
    })
  });

  return horsesWithRaces;
}






module.exports = {
  getFlatRaces,
  getRacesMenu,
  getSingleRaceRunners,
  getHorsesWithRaces,
}