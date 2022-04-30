import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'
import { hasConflicts } from './hasConflicts.js'

export async function pullRemoteChanges(shell, branch) {
  shell.echo(logMessage.info + `Pulling from '${branch}'`)
  const res = shell.exec(`git pull --rebase origin ${branch}`)

  if (hasConflicts(res)) {
    await resolveMergeConflicts(shell)
  }
}
