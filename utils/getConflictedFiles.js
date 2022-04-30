export function getConflictedFiles(shell) {
  const files = shell.find('.').filter(file => {
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
