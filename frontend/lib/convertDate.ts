const convertDate = function (milliseconds: string) {
  const convertToInt = parseInt(milliseconds);
  const date = new Date(convertToInt);

  return date.toString();
};

export default convertDate;
