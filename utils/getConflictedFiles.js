export function getConflictedFiles(shell, pattern = '.') {
  const files = shell.find(pattern).filter(file => {
    try {
      const grepRes = shell.grep('--', '<<<<<<< HEAD', file).replace(/\n/g, '')

      if (grepRes != '') {
        return file
      }
    } catch (err) {
      return
    }
  })

  return files
}
