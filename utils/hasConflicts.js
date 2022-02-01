function hasConflicts(shell) {
  const resFiles = shell.find('.').filter(file => {
    try {
      const grepRes = shell.grep('--', '<<<<<<<', file)
      const grepResTrimmed = grepRes.replace(/\n/g, '')

      if (grepResTrimmed != '') {
        return file
      }
    } catch (err) {
      return
    }
  })

  if (resFiles.length < 1) return false

  return true
}

module.exports = { hasConflicts }
