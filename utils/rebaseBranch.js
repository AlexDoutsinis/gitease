import { hasConflicts } from './hasConflicts.js'
import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'

export async function rebaseBranch(shell, branch) {
  shell.echo(logMessage.info + `Rebasing '${branch}'`)
  const res = shell.exec(`git rebase ${branch}`)

  if (hasConflicts(res)) {
    await resolveMergeConflicts(shell)
  }
}
