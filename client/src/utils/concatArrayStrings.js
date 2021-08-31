export const concatArrayStrings = (arr) => {
  let concatedString = "";
  arr.forEach((s, i) => {
    if (concatedString === "") return (concatedString = s);
    else if (arr.length === i + 1) concatedString = `${concatedString} & ${s}`;
    else concatedString = `${concatedString}, ${s}`;
  });
  return concatedString;
};
