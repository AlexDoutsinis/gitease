function hashTable() {
  const values = {}

  return {
    values,

    add(key, value) {
      values[key] = value
    },

    search(key) {
      if (values.hasOwnProperty(key)) {
        return values[key]
      } else {
        return null
      }
    },
  }
}

module.exports = { hashTable }
