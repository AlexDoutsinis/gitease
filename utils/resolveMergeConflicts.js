import { logConflictedFiles } from './logConflictedFiles.js'
import { hasMergeConflicts } from './hasMergeConflicts.js'
import { sleep } from './sleep.js'
import { getConflictedFiles } from './getConflictedFiles.js'
import { logMessage } from './logMessage.js'
import { shellExit } from './shellExit.js'

export async function resolveMergeConflicts(shell) {
  let files = null
  let count = 0
  let targetCount = 0

  const resolveConflicts = async (notifyConflicts = true) => {
    if (notifyConflicts) {
      targetCount = targetCount + 20
      await logConflictedFiles(shell, files)
    }

    const conflictsFound = hasMergeConflicts(shell)
    if (conflictsFound) {
      count++
      await sleep(1000)

      if (count == targetCount) {
        return await resolveConflicts()
      }

      return await resolveConflicts(false)
    }

    if (count > 0) {
      files.forEach(file => shell.exec(`git add ${file}`, { silent: true }))
      shell.exec('git rebase --continue', { silent: true })
      return
    }

    shell.echo(
      logMessage.info +
        `There are some conflicts but they can not be found in the current directory and sub-directories. Please run the command again from the root directory`,
    )
    shellExit(shell)
  }

  files = getConflictedFiles(shell)
  await resolveConflicts()
}
