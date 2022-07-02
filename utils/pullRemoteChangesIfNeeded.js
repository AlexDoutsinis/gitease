import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'
import { hasConflicts } from './hasConflicts.js'
import { localBranchIsBehind } from './localBranchIsBehind.js'
import { branchExistOnRemote } from './branchExistOnRemote.js'

export async function pullRemoteChangesIfNeeded(shell, branch) {
  if (!branchExistOnRemote(shell, branch)) {
    shell.echo(logMessage.error + `'${branch}' does not exist on remote`)
    return
  }

  if (!localBranchIsBehind(shell)) {
    shell.echo(logMessage.warning + `There are not changes to pull from '${branch}'`)
    return
  }

  shell.echo(logMessage.info + `Pulling from '${branch}'`)
  const res = shell.exec(`git pull --rebase origin ${branch}`)

  if (hasConflicts(res)) {
    await resolveMergeConflicts(shell)
  }
}
