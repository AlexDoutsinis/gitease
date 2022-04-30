import { hasConflicts } from './hasConflicts.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'

export async function rebaseBranch(shell, branch) {
  shell.echo(`Rebasing '${branch}'`)
  const res = shell.exec(`git rebase ${branch}`, { silent: true })

  if (hasConflicts(res)) {
    await resolveMergeConflicts(shell)
  }
}
