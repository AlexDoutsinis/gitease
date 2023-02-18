import shell from 'shelljs'
import { branchExistOnRemote } from '../utils/branchExistOnRemote.js'
import { branchIsDiverged } from '../utils/branchIsDiverged.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { localBranchHasCommits } from '../utils/localBranchHasCommits.js'
import { localBranchIsBehind } from '../utils/localBranchIsBehind.js'
import { logMessage } from '../utils/logMessage.js'
import { requireGit } from '../utils/requireGit.js'
import { stashDoThenPop } from '../utils/stashDoThenPop.js'

export function push(program) {
  program
    .command({
      name: 'push',
      description: 'Push commits to remote. Takes care of stashing changes',
    })
    .action(async () => {
      requireGit(shell)
      const currentLocalBranch = getCurrentLocalBranch(shell)

      await stashDoThenPop(shell, async () => {
        if (branchExistOnRemote(shell, currentLocalBranch)) {
          const msg = logMessage.info + `'${currentLocalBranch}' branch exist on remote. Pushing the changes`
          shell.echo(msg)
        } else {
          shell.echo(
            logMessage.warning +
              `'${currentLocalBranch}' branch does not exist on remote. This command is only used to push commits to existing remote branches`,
          )

          return
        }

        if (branchIsDiverged(shell)) {
          shell.echo(
            logMessage.error +
              `'${currentLocalBranch}' branch is diverged. Please pull from remote and run the command again`,
          )

          return
        }

        if (localBranchHasCommits(shell)) {
          const isBehind = localBranchIsBehind(shell)

          if (isBehind) {
            shell.echo(
              logMessage.error +
                "The remote contains work that you do not have locally. Please pull the changes before pushing to remote",
            )

            return
          }

          shell.exec(`git push`, {silent: true})
          shell.echo(logMessage.success + `The changes are pushed to remote '${currentLocalBranch}' branch`)
        } else {
          shell.echo(logMessage.warning + 'There are no commits to push')
        }
      })
    })
}
