const { showConflicts } = require('./showConflicts')
const { message } = require('./message')
const { hasConflicts } = require('./hasConflicts')
const { sleep } = require('./sleep')
const { getConflictedFiles } = require('./getConflictedFiles')

async function resolveConflicts(shell, res) {
  const conflictExist = res.toLowerCase().includes('conflict')
  let conflictedFiles = null

  let count = 0
  let showCount = 0

  const findConflicts = async (show = true) => {
    if (show) {
      showCount = showCount + 20
      await showConflicts(shell, '.')
    }

    const conflictsFound = hasConflicts(shell)
    if (conflictsFound) {
      count++
      await sleep(1000)

      if (count == showCount) {
        return await findConflicts()
      }

      return await findConflicts(false)
    }

    if (count > 0) {
      conflictedFiles.forEach(conflictedFile => shell.exec(`git add ${conflictedFile}`))
      shell.exec('git rebase --continue', { silent: true })
    }
  }

  if (conflictExist) {
    conflictedFiles = getConflictedFiles(shell, '.')
    await findConflicts()
  }
}

module.exports = { resolveConflicts }
