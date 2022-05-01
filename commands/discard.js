import shell from 'shelljs'
import { logMessage } from '../utils/logMessage.js'
import { requireGit } from '../utils/requireGit.js'

export function discard(program) {
  program
    .command({
      name: 'discard',
      description: 'Undo any modifications since the last commit',
    })
    .argument({
      name: 'files',
      description: 'The files to discard',
      isRequired: true,
      acceptMultipleValues: true,
    })
    .action(files => {
      requireGit(shell)

      const discardFile = file => {
        shell.exec(`git reset HEAD ${file}`, { silent: true })
        shell.exec(`git checkout -- ${file}`, { silent: true })
        shell.echo(logMessage.success + `'${file}' discarded`)
      }

      files.forEach(file => discardFile(file))
    })
}
