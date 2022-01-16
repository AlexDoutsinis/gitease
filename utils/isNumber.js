function isNumber(str) {
  if (str === '') return 'This value is required'
  const isNumber = !isNaN(str) && !isNaN(parseFloat(str))
  if (!isNumber) return 'Please enter a valid number'

  return true
}

module.exports = { isNumber }
