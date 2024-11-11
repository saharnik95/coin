export const formatNumberWithCommas = (number: number): string => {
  return isNaN(number)
    ? number.toString()
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
