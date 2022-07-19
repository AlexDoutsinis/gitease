import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { getCurrentLocalBranch } from '../utils/getCurrentLocalBranch.js'
import { checkoutBranch } from '../utils/checkoutBranch.js'
import { rebaseBranch } from '../utils/rebaseBranch.js'
import { pullRemoteChangesIfNeeded } from '../utils/pullRemoteChangesIfNeeded.js'
import { localBranchExist } from '../utils/localBranchExist.js'
import { logMessage } from '../utils/logMessage.js'
import { stashDoThenPop } from '../utils/stashDoThenPop.js'
import { branchExistOnRemote } from '../utils/branchExistOnRemote.js'

export function refresh(program) {
  program
    .command({
      name: 'refresh',
      description: 'Refreshes the current local branch from a remote branch',
    })
    .argument({
      name: 'remoteBranch',
      description: 'The remote branch to pull from',
      isRequired: false,
    })
    .action(async remoteBranch => {
      requireGit(shell)
      const currentBranch = getCurrentLocalBranch(shell)

      if (currentBranch == remoteBranch || !remoteBranch) {
        await stashDoThenPop(shell, async () => {
          await pullRemoteChangesIfNeeded(shell, currentBranch)
        })
      } else {
        if (!localBranchExist(shell, remoteBranch)) {
          shell.echo(logMessage.error + `'${remoteBranch}' does not exist locally`)
          return
        }

        if (!branchExistOnRemote(shell, remoteBranch)) {
          shell.echo(logMessage.error + `'${remoteBranch}' does not exist on remote`)
          return
        }

        if (branchExistOnRemote(shell, currentBranch)) {
          shell.echo(
            logMessage.error +
              `You are currently on '${currentBranch}' branch which exists on remote. Please make sure that you are on a local branch in order to continue with the command`,
          )
          return
        }

        await stashDoThenPop(shell, async () => {
          checkoutBranch(shell, remoteBranch)
          const remoteBranchHasChanges = await pullRemoteChangesIfNeeded(
            shell,
            remoteBranch,
          )
          checkoutBranch(shell, currentBranch)

          if (!remoteBranchHasChanges) {
            shell.echo(
              logMessage.warning +
                `There are no changes to pull from '${remoteBranch}' branch. '${currentBranch}' is fresh!`,
            )
            return
          }

          await rebaseBranch(shell, remoteBranch)
        })
      }
    })
}
