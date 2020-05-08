const runnerFields = [
  "start_number", "figures", 
  "horse_uid", "horse_name", "horse_age",
  "jockey_uid", "jockey_name",
  "trainer_id", "trainer_stylename",
  "spotlight",
  "silk_image_path",
  "weight_carried_lbs"
];

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

const dateObj = () => {
  let date = new Date(Date.parse("2020-04-16T18:00:00+01:00"));

  return ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    monthDate: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  })
}

const distanceObj = () => {
  let yards = "1870"

  let miles = Math.trunc(yards / 1760)
  let yardsLeft = yards % 1760
  let furlongs = Math.trunc(yardsLeft / 220)
  let left = yardsLeft % 220
  return ({
    miles,
    furlongs,
    left,
  })
}


module.exports = {
  runnerFields,
  numberWithCommas,
  months,
  dateObj: dateObj(),
  distanceObj: distanceObj(),
}