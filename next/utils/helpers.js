export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const transformNumber = (value) =>
  value.val.interpolate((val) => numberWithCommas(Math.floor(val)));
