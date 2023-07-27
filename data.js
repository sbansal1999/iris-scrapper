function analyze(array) {
  console.log(array);

  array.forEach((item) => {
    delete item.role;
    delete item.location;
  });

  const countMap = array.reduce((map, item) => {
    const key = item.company; // Convert object to string for comparison
    const count = map.get(key) || 0;
    map.set(key, count + 1);
    return map;
  }, new Map());

  console.log(countMap);

  const sortedArray = Array.from(countMap);

  // Sort the array based on the values in descending order
  sortedArray.sort((a, b) => b[1] - a[1]);

  // Convert the sorted array back to a map
  const sortedMap = new Map(sortedArray);

  console.log(sortedMap);

  var totalCount = 0;

  sortedMap.forEach((value, key) => {
    totalCount += value;
  });

  console.log(totalCount);
}

module.exports = {
  analyze,
};
