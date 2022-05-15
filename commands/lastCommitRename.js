import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'

export function lastCommitRename(program) {
  program
    .command({
      name: 'last-commit-rename',
      description: 'Renames the latest commit',
    })
    .argument({ name: 'name', isRequired: true })
    .action(name => {
      requireGit(shell)

      shell.exec(`git commit --amend -m "${name}"`)
    })
}
