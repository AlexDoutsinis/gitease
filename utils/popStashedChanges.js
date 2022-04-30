import { logMessage } from './logMessage.js'
import { resolveMergeConflicts } from './resolveMergeConflicts.js'

export async function popStashedChanges(shell) {
  shell.echo(logMessage.info + 'Apply Stash')
  const res = shell.exec('git stash pop', { silent: true })
  const hasConflicts = res.toLowerCase().includes('conflict')

  if (hasConflicts) {
    await resolveMergeConflicts(shell)
  }
}
