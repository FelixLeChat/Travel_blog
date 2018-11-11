// @flow

export const groupBy = (xs, key) => xs.reduce((rv, x) => {
  const newArray = rv;
  (newArray[x[key]] = newArray[x[key]] || []).push(x);
  return newArray;
}, {});

export const TOREMOVE = () => {};
