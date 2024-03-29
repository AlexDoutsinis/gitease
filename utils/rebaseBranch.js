import { hasConflicts } from './hasConflicts.js'
import { logMessage } from './logMessage.js'
import { resolveConflicts } from './resolveConflicts.js'

export async function rebaseBranch(shell, branch) {
  shell.echo(logMessage.info + `Rebasing '${branch}' branch`)
  const res = shell.exec(`git rebase ${branch}`)

  if (hasConflicts(res)) {
    await resolveConflicts(shell, false)
  }
}
