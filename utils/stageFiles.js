import { logMessage } from './logMessage.js'

export function stageFiles(shell, files) {
  shell.echo(logMessage.info + 'Adding changes')

  files.forEach(file => {
    shell.exec(`git add ${file}`)
  })
}
