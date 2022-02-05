function getConflictedFiles(shell, pattern) {
  const files = shell.find(pattern).filter(file => {
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

  return files
}

module.exports = { getConflictedFiles }
