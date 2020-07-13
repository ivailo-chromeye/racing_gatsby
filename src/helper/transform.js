export const transformVerdict = verdict => {
  if(verdict) {
    return verdict.split("\\b").join("").split("\\p").join("");
  } 
  return "";
}