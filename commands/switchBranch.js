import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'

export function switchBranch(program) {
  program
    .command({
      name: 'switch',
      description:
        'Switch branches easily. Takes care of stashing changes and creating a new branch if required.',
    })
    .argument({ name: 'branch', isRequired: true })
    .action(branch => {
      requireGit(shell)
    })
}
