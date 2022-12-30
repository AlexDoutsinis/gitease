import { logConflictedFiles } from './logConflictedFiles.js'
import { sleep } from './sleep.js'
import { getConflictedFiles } from './getConflictedFiles.js'

export async function resolveConflicts(shell, merge = true) {
  let files = null
  let conflictedFiles = null
  let count = 0
  let targetCount = 0

  const resolveConflicts = async (notifyConflicts = true) => {
    if (notifyConflicts) {
      targetCount = targetCount + 15
      await logConflictedFiles(shell, conflictedFiles)
    }

    const conflictsFound = getConflictedFiles(shell).length > 0
    if (conflictsFound) {
      count++
      await sleep(1000)

      if (count == targetCount) {
        conflictedFiles = getConflictedFiles(shell)
        return await resolveConflicts()
      }

      return await resolveConflicts(false)
    }

    if (count > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        shell.exec(`git add ${file}`, { silent: true })
      }

      if (merge) {
        shell.exec(`git commit -m "resolve merge conflicts"`)
      }
      else {
        shell.exec('git -c core.editor=true rebase --continue')
      }
    }
  }

  conflictedFiles = getConflictedFiles(shell)
  files = conflictedFiles
  await resolveConflicts()
}
