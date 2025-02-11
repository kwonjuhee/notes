export const toYYYYMMDD = (date: Date, seperator = "-") => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const YYYY = String(year);
  const MM = String(month).padStart(2, "0");
  const DD = String(day).padStart(2, "0");

  return [YYYY, MM, DD].join(seperator);
};
