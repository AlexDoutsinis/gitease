import { logMessage } from './logMessage.js'

export function checkoutBranch(shell, branch) {
  shell.echo(logMessage.info + `Switching to '${branch}' branch`)

  shell.exec(`git checkout ${branch}`, { silent: true })
}
