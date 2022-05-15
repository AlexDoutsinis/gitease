import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'

export function showGitUser(program) {
  program
    .command({ name: 'show-git-user', description: 'Show current git user' })
    .action(() => {
      requireGit(shell)

      shell.exec('git config user.name')
      shell.exec('git config user.email')
    })
}
