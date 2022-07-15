import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { checkoutBranch } from '../utils/checkoutBranch.js'
import { rebaseBranch } from '../utils/rebaseBranch.js'
import { pullRemoteChangesIfNeeded } from '../utils/pullRemoteChangesIfNeeded.js'
import { localBranchExist } from '../utils/localBranchExist.js'
import { logMessage } from '../utils/logMessage.js'
import { stashDoThenPop } from '../utils/stashDoThenPop.js'

export function refresh(program) {
  program
    .command({
      name: 'refresh',
      description: 'Refreshes the current branch from a remote branch',
    })
    .argument({
      name: 'remoteBranch',
      description: 'The remote branch to pull from',
      isRequired: false,
    })
    .action(async branch => {
      requireGit(shell)
      const currentBranch = getCurrentLocalBranch(shell)

      if (currentBranch == branch || !branch) {
        await stashDoThenPop(shell, async () => {
          await pullRemoteChangesIfNeeded(shell, currentBranch)
        })
      } else {
        if (!localBranchExist(shell, branch)) {
          shell.echo(logMessage.error + `'${branch}' does not exist locally`)
          return
        }

        await stashDoThenPop(shell, async () => {
          const currentBranchHasChanges = await pullRemoteChangesIfNeeded(
            shell,
            currentBranch,
          )
          checkoutBranch(shell, branch)
          const branchHasChanges = await pullRemoteChangesIfNeeded(shell, branch)
          checkoutBranch(shell, currentBranch)

          if (!currentBranchHasChanges && !branchHasChanges) {
            shell.echo(
              logMessage.warning +
                `There are no changes to pull from ${currentBranch}' and '${branch}' branches so the process ends here`,
            )
            return
          }

          await rebaseBranch(shell, branch)
        })
      }
    })
}
