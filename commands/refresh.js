import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { checkoutBranch } from '../utils/checkoutBranch.js'
import { rebaseBranch } from '../utils/rebaseBranch.js'
import { stashAndPullRemoteChangesIfNeeded } from '../utils/stashAndPullRemoteChangesIfNeeded.js'

export function refresh(program) {
  program
    .command({
      name: 'refresh',
      description: 'Refreshes the current branch from a remote branch',
    })
    .argument({
      name: 'remoteBranch',
      description: 'The remote branch to pull from',
      isRequired: true,
    })
    .action(async remoteBranch => {
      requireGit(shell)
      const currentBranch = getCurrentLocalBranch(shell)

      if (currentBranch == remoteBranch) {
        await stashAndPullRemoteChangesIfNeeded(shell, remoteBranch)
      } else {
        checkoutBranch(shell, remoteBranch)
        await stashAndPullRemoteChangesIfNeeded(shell, remoteBranch)
        checkoutBranch(shell, currentBranch)
        await rebaseBranch(shell, remoteBranch)
      }
    })
}
