import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { stageFiles } from '../utils/stageFiles.js'
import { createCommitMessage } from '../utils/createCommitMessage.js'
import { logMessage } from '../utils/logMessage.js'
import { pullOption } from '../options/pullOption.js'
import { shellExit } from '../utils/shellExit.js'
import { stashDoThenPop } from '../utils/stashDoThenPop.js'
import { pullRemoteChangesIfNeeded } from '../utils/pullRemoteChangesIfNeeded.js'

export function commit(program) {
  program
    .command({
      name: 'commit',
      description:
        'Create a commit after staging current changes and updating from remote branch. Pulling before creating a new commit can tremendously reduce future conflicts.',
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
      },
      pullOption,
    ])
    .action(async options => {
      requireGit(shell)
      const { add: files, message, pull } = options
      const currentBranch = getCurrentLocalBranch(shell)
      const pullOptionIsUsed = pull != undefined

      if (pullOptionIsUsed) {
        await stashDoThenPop(shell, async () => {
          await pullRemoteChangesIfNeeded(shell, currentBranch)
        })
      }

      stageFiles(shell, files)
      const { noChanges, changesAreNotStaged } = createCommitMessage(shell, message)

      if (noChanges) {
        shell.echo(logMessage.info + 'There are no changes to commit')
        shellExit(shell)
      }

      if (changesAreNotStaged) {
        shell.echo(
          logMessage.info + 'Please stage some changes in order to create a new commit',
        )
        shellExit(shell)
      }

      shell.echo(logMessage.success + 'The commit is created')
    })
}
