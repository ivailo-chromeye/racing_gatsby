export const f = name => {
  if (!name) return "";
  return name
    .split(" ")
    .join("-")
    .split("'")
    .join("")
    .toLowerCase();
}

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

  window.open(
    type === "race" ? raceURL : participantUrl,
    `${type}`,
    "width=750,height=800"
  );
}



