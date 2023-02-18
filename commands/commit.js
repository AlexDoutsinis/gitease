import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { stageFiles } from '../utils/stageFiles.js'
import { createCommitMessage } from '../utils/createCommitMessage.js'
import { logMessage } from '../utils/logMessage.js'
import { shellExit } from '../utils/shellExit.js'

export function commit(program) {
  program
    .command({
      name: 'commit',
      description:
        'Create a commit after staging current changes. Files can be either space or comma(,) separated.',
    })
    .options([
      {
        name: { full: 'add', short: 'a' },
        description: 'add/stage files',
        acceptMultipleValues: true,
        isRequired: true,
        valueIsRequired: true,
      },
      {
        name: { full: 'message', short: 'm' },
        description: 'commit message',
        acceptMultipleValues: false,
        isRequired: true,
        valueIsRequired: true,
      }
    ])
    .action(async options => {
      requireGit(shell)
      const { add: givenFiles, message } = options

      const files = givenFiles.includes(",") ? givenFiles.split(",") : givenFiles;

      stageFiles(shell, files)
      const { noChanges } = createCommitMessage(shell, message)

      if (noChanges) {
        shell.echo(logMessage.warning + 'There is nothing to commit')
        shellExit(shell)
      }

      shell.echo(logMessage.success + 'The commit is created')
    })
}
