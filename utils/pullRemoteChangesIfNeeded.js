import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'
import { hasConflicts } from './hasConflicts.js'
import { localBranchIsBehind } from './localBranchIsBehind.js'
import { branchExistOnRemote } from './branchExistOnRemote.js'

export async function pullRemoteChangesIfNeeded(shell, branch) {
  if (!branchExistOnRemote(shell, branch)) {
    shell.echo(logMessage.warning + `'${branch}' branch does not exist on remote`)
    return false
  }

  if (!localBranchIsBehind(shell)) {
    shell.echo(
      logMessage.warning + `There are no changes to pull from '${branch}' branch`,
    )
    return false
  }

  shell.echo(logMessage.info + `Pulling from '${branch}' branch`)
  const res = shell.exec(`git pull --rebase origin ${branch}`)

  if (hasConflicts(res)) {
    await resolveMergeConflicts(shell)
  }

  return true
}
