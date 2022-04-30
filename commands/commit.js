import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { localBranchIsBehind } from '../utils/localBranchIsBehind.js'
import { stashCurrentChanges } from '../utils/stashCurrentChanges.js'
import { pullRemoteChanges } from '../utils/pullRemoteChanges.js'
import { popStashedChanges } from '../utils/popStashedChanges.js'
import { stageFiles } from '../utils/stageFiles.js'
import { createCommitMessage } from '../utils/createCommitMessage.js'
import { logMessage } from '../utils/logMessage.js'
import { pullOption } from '../options/pullOption.js'

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
        argumentIsRequired: true,
      },
      {
        name: { full: 'message', short: 'm' },
        description: 'commit message',
        acceptMultipleValues: false,
        isRequired: true,
        argumentIsRequired: true,
      },
      pullOption,
    ])
    .action(async options => {
      requireGit(shell)
      const { add: files, message, pull } = options
      const currentBranch = getCurrentLocalBranch(shell)
      const branchIsBehind = localBranchIsBehind(shell)
      const pullOptionIsUsed = pull != undefined

      if (pullOptionIsUsed) {
        if (branchIsBehind) {
          stashCurrentChanges(shell)
        }

        await pullRemoteChanges(shell, currentBranch)

        if (branchIsBehind) {
          await popStashedChanges(shell)
        }
      }

      stageFiles(shell, files)
      const { noChanges, changesAreNotStaged } = createCommitMessage(shell, message)

      if (noChanges) {
        shell.echo(logMessage.info + 'There are no changes to commit')
        shell.exit(1)
      }

      if (changesAreNotStaged) {
        shell.echo(
          logMessage.info + 'Please stage some changes in order to create a new commit',
        )
        shell.exit(1)
      }

      shell.echo(logMessage.success + 'The commit is created')
    })
}
