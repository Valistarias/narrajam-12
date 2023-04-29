/* eslint-disable object-property-newline */
/* eslint-disable import/prefer-default-export */
export const classTrim = (elt) => elt.replace(/\n {2,}/g, ' ').replace(/\s+/g, ' ').trim();

export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) { return false; }

  let discrepency = false;
  arr1.every((arr1Elt) => {
    if (!arr2.includes(arr1Elt)) {
      discrepency = true;
      return false;
    }
    return true;
  });

  return !discrepency;
};

export const testDice = (dice) => {
  const regex = /^[1-9]([0-9]+)?d(4|6|8|10|12|20|100)$/g;
  return regex.test(dice);
};

export const testAlphanumerical = (string) => {
  const regex = /^[a-z 0-9]+$/g;
  return regex.test(string);
};

export const testNumber = (number) => {
  const regex = /^[0-9]+$/g;
  return regex.test(Number(number));
};
