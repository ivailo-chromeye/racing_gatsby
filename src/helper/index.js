export const f = name => {
  if (!name) return "";
  return name
    .split(" ")
    .join("-")
    .split("'")
    .join("")
    .toLowerCase();
}