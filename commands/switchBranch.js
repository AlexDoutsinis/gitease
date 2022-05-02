import shell from 'shelljs'
import { localBranchExist } from '../utils/localBranchExist.js'
import { logMessage } from '../utils/logMessage.js'
import { requireGit } from '../utils/requireGit.js'
import { stashDoThenPop } from '../utils/stashDoThenPop.js'

export function switchBranch(program) {
  program
    .command({
      name: 'switch',
      description:
        'Switch branches easily. Takes care of stashing changes and creating a new branch if required.',
    })
    .argument({ name: 'branch', isRequired: true })
    .action(async branch => {
      requireGit(shell)

      await stashDoThenPop(shell, () => {
        if (localBranchExist(shell, branch)) {
          shell.echo(logMessage.info + `Branch '${branch}' already exists. Switch to it`)
          shell.exec(`git checkout ${branch}`, { silent: true })
        } else {
          shell.echo(
            logMessage.info +
              `Branch '${branch}' does not exists. Create the branch and switch`,
          )
          shell.exec(`git checkout -b ${branch}`, { silent: true })
        }
      })
    })
}
