export const f = name => {
  if (!name) return "";
  return name
    .split(" ")
    .join("-")
    .split(".")
    .join("")
    .split("'")
    .join("")
    .toLowerCase();
}

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const timeSince = timeStamp => {
  let now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h';
  }
  if (secondsPast > 86400) {
    day = timeStamp.getDate();
    month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

export const rpModal = ({ type, id, name, date }) => {
  const baseURL = "https://www.racingpost.com/";
  const participantUrl = `${baseURL}/profile/${type}/${id}/${f(name)}`;
  const raceURL = `${baseURL}/results/11/cheltenham/${date}/${id}/`;

  if(window) {
    window.open(
      type === "race" ? raceURL : participantUrl,
      `${type}`,
      "width=750,height=800"
    );
  }
}

export const sortRunners = (runners, sortObj) => {
  return runners.sort((a,b)=> {

    switch(sortObj.filter) {
      case "start_number": {
        if(sortObj.dir) {
          return a.start_number > b.start_number ? 1 : -1;
        } else {
          return a.start_number > b.start_number ? -1 : 1;
        }
      }
      case "horse_name": {
        if(sortObj.dir) {
          return b["horse_name"].localeCompare(a["horse_name"])
        } else {
          return a["horse_name"].localeCompare(b["horse_name"]);
        }
      }
      case "jockey": {
        if(sortObj.dir) {
          return b["jockey_name"].localeCompare(a["jockey_name"])
        } else {
          return a["jockey_name"].localeCompare(b["jockey_name"]);
        }
      }
      case "trainer": {
        if(sortObj.dir) {
          return b["trainer_stylename"].localeCompare(a["trainer_stylename"])
        } else {
          return a["trainer_stylename"].localeCompare(b["trainer_stylename"]);
        }
      }
      case "age": {
        if(sortObj.dir) {
          return a.horse_age > b.horse_age ? 1 : -1;
        } else {
          return a.horse_age < b.horse_age ? 1 : -1;
        }
      }
      default: return 1;
    }
  });
}

export const randomFromArray = array => {
  return array[Math.floor(Math.random() * array.length)];
}