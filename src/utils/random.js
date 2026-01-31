/* eslint-disable */
function sample(arr) {
  if (!arr || arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function sampleSize(arr, n) {
  if (!arr || arr.length === 0 || n <= 0) return [];

  const result = [];
  const copied = [...arr]; // copy to avoid mutating original array

  const count = Math.min(n, arr.length);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copied.length);
    result.push(copied[randomIndex]);
    copied.splice(randomIndex, 1); // remove used element to avoid duplicates
  }

  return result;
}

module.exports = { sample, sampleSize };
