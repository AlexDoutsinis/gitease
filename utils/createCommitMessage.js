import { logMessage } from './logMessage.js'

export function createCommitMessage(shell, message) {
  shell.echo(logMessage.info + 'Creating the commit')
  const res = shell.exec(`git commit -m "${message}"`, { silent: true })
  const noChanges = res.toLowerCase().includes('nothing to commit')
  const changesAreNotStaged = res.toLowerCase().includes('not staged')

  return {
    noChanges,
    changesAreNotStaged,
  }
}
