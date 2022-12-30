import { logMessage } from './logMessage.js'
import { resolveConflicts } from './resolveConflicts.js'
import { hasConflicts } from './hasConflicts.js'

export async function popStashedChanges(shell) {
  shell.echo(logMessage.info + 'Applying Stash')
  const res = shell.exec('git stash pop', { silent: true })

  if (hasConflicts(res)) {
    await resolveConflicts(shell)
  }
}
