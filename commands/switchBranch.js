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
    .options([
      {
        name: { full: 'branch', short: 'b' },
        description: 'The branch to switch',
        isRequired: true,
        valueIsRequired: true,
        acceptMultipleValues: false,
      },
      {
        name: { full: 'move', short: 'mv' },
        description: 'Move changes from current to target branch',
        isRequired: false,
        valueIsRequired: false,
        acceptMultipleValues: false,
      },
    ])
    .action(async ({ branch, move }) => {
      requireGit(shell)

      const switchBranch = () => {
        if (localBranchExist(shell, branch)) {
          shell.echo(logMessage.info + `Branch '${branch}' already exists. Switch to it`)
          shell.exec(`git checkout ${branch}`)
        } else {
          shell.echo(
            logMessage.info +
              `Branch '${branch}' does not exists. Create the branch and switch`,
          )
          shell.exec(`git checkout -b ${branch}`)
        }
      }

      if (!move) {
        switchBranch()

        return
      }

      await stashDoThenPop(shell, () => {
        switchBranch()
      })
    })
}
