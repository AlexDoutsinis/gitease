import { logMessage } from './logMessage.js'

export function stageFiles(shell, files) {
  const msg = files.length > 1 ? 'Adding files' : 'Adding file'
  shell.echo(logMessage.info + msg)

  files.forEach(file => shell.exec(`git add ${file}`))
}
