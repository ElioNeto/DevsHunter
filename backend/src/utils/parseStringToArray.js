module.exports = function parseStringToArray(arrayAsString) {
  if (!arrayAsString) {
    return [];
  }

  arrayAsString.toUpperCase()
  let array = arrayAsString.toUpperCase().split(',').map(array => array.trim())

  return array
}