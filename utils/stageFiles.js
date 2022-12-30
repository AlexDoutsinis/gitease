import { logMessage } from './logMessage.js'

export function stageFiles(shell, files) {
  shell.echo(logMessage.info + 'Adding files')

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    shell.exec(`git add ${file}`);
  }
}
