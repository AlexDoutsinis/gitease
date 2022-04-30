import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'

export async function pullRemoteChanges(shell, branch) {
  shell.echo(logMessage.info + `Pulling from '${branch}'`)
  const res = shell.exec(`git pull --rebase origin ${branch}`, { silent: true })
  const hasConflicts = res.toLowerCase().includes('conflict')

  if (hasConflicts) {
    await resolveMergeConflicts(shell)
  }
}
