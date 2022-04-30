export function hasMergeConflicts(shell) {
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

  if (files.length < 1) return false

  return true
}
