export function getConflictedFiles(shell) {
  const status = shell.exec('git status', { silent: true })
  const files = getStringsBetween(status, `modified:`, `\n`)
  const trimmedFiles = files.map(file => file.trim())
  const conflictedFiles = trimmedFiles.filter(file => fileHasConflicts(shell, file))

  return conflictedFiles
}

function fileHasConflicts(shell, file) {
  const grepRes = shell.grep('--', '<<<<<<<', file).replace(/\n/g, '')

  if (grepRes) {
    return true
  }

  return false
}

function getStringsBetween(str, start, end) {
  const strs = []

  const stringsBetween = (str, start, end) => {
    let currentStr = getStringBetween(str, start, end)

    if (currentStr) {
      strs.push(currentStr)
      const restStr = str.replace(start + currentStr + end, '')
      stringsBetween(restStr, start, end)
    }
  }

  stringsBetween(str, start, end)

  return strs
}

function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + '(.*)' + end))

  if (!result) return ''

  return result[1]
}
