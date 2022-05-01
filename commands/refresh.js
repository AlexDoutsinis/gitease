import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { checkoutBranch } from '../utils/checkoutBranch.js'
import { rebaseBranch } from '../utils/rebaseBranch.js'
import { stashAndPullRemoteChangesIfNeeded } from '../utils/stashAndPullRemoteChangesIfNeeded.js'
import { stashCurrentChanges } from '../utils/stashCurrentChanges.js'
import { branchExistOnRemote } from '../utils/branchExistOnRemote.js'
import { pullRemoteChanges } from '../utils/pullRemoteChanges.js'
import { popStashedChanges } from '../utils/popStashedChanges.js'
import { localBranchExist } from '../utils/localBranchExist.js'
import { logMessage } from '../utils/logMessage.js'

export function refresh(program) {
  program
    .command({
      name: 'refresh',
      description:
        'Refreshes the current branch from x branch. If x branch is same with current branch, it just pulls from x. If it is not, then it merges x branch into current branch',
    })
    .argument({
      name: 'remoteBranch',
      description: 'The remote branch to pull from',
      isRequired: true,
    })
    .action(async branch => {
      requireGit(shell)
      const currentBranch = getCurrentLocalBranch(shell)

      if (currentBranch == branch) {
        await stashAndPullRemoteChangesIfNeeded(shell, branch)
      } else {
        if (!localBranchExist(shell, branch)) {
          shell.echo(logMessage.error + `'${branch}' does not exist locally`)
          return
        }

        stashCurrentChanges(shell)
        checkoutBranch(shell, branch)

        if (branchExistOnRemote(shell, branch)) {
          pullRemoteChanges(shell, branch)
        }

        checkoutBranch(shell, currentBranch)
        await rebaseBranch(shell, branch)
        await popStashedChanges(shell)
      }
    })
}
