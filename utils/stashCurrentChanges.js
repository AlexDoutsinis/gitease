import { logMessage } from './logMessage.js'

export function stashCurrentChanges(shell) {
  shell.echo(logMessage.info + 'Stashing changes')
  shell.exec('git stash --include-untracked', {
    silent: true,
  })
}
