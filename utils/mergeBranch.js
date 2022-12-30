import { hasConflicts } from './hasConflicts.js'
import { logMessage } from './logMessage.js'
import { resolveConflicts } from './resolveConflicts.js'

export async function mergeBranch(shell, branch) {
  shell.echo(logMessage.info + `Merging '${branch}' branch`)
  const res = shell.exec(`git merge ${branch}`)

  if (hasConflicts(res)) {
    await resolveConflicts(shell, true)
  }
}