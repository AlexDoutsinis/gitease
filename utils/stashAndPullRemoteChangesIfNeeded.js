import { localBranchIsBehind } from './localBranchIsBehind.js'
import { stashCurrentChanges } from './stashCurrentChanges.js'
import { pullRemoteChanges } from './pullRemoteChanges.js'
import { popStashedChanges } from './popStashedChanges.js'
import { logMessage } from './logMessage.js'

export async function stashAndPullRemoteChangesIfNeeded(shell, branch) {
  if (localBranchIsBehind(shell)) {
    stashCurrentChanges(shell)
    await pullRemoteChanges(shell, branch)
    await popStashedChanges(shell)
  } else {
    shell.echo(logMessage.info + `There are not changes to pull from '${branch}'`)
  }
}
