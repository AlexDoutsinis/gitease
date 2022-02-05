const { showConflicts } = require('./showConflicts')
const { message } = require('./message')
const { hasConflicts } = require('./hasConflicts')
const { sleep } = require('./sleep')

async function resolveConflicts(shell, res) {
  const conflictExist = res.toLowerCase().includes('conflict')

  let count = 0
  let showCount = 0

  const findConflicts = async (show = true) => {
    if (show) {
      showCount = showCount + 15
      await showConflicts(shell, '.')
    }

    const conflictsFound = hasConflicts(shell)
    if (conflictsFound) {
      count++
      await sleep(500)

      if (count == showCount) {
        return await findConflicts()
      }

      return await findConflicts(false)
    }

    if (count > 0) {
      shell.exec('git rebase --continue', { silent: true })
    }
  }

  if (conflictExist) {
    await findConflicts()
  }
}

module.exports = { resolveConflicts }
