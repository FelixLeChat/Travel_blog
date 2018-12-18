// @flow

export const groupBy = (xs, key) => xs.reduce((rv, x) => {
  const newArray = rv;
  (newArray[x[key]] = newArray[x[key]] || []).push(x);
  return newArray;
}, {});

export const compareValues = (key, order = 'asc') => (a, b) => {
  if (
    !Object.prototype.hasOwnProperty.call(a, key)
    || !Object.prototype.hasOwnProperty.call(b, key)
  ) {
    // property doesn't exist on either object
    return 0;
  }

  const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
  const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }
  return order === 'desc' ? comparison * -1 : comparison;
};
