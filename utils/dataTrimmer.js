const regularTrim = (obj) => {
  const trimmedData = {};
  for (const key in obj) {
    trimmedData[key] = obj[key].trim();
  }
  return trimmedData;
};

module.exports = regularTrim;
