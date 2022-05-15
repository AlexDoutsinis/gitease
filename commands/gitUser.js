import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { logMessage } from '../utils/logMessage.js'

export function gitUser(program) {
  program
    .command({ name: 'git-user', description: 'Change username and email' })
    .options([
      {
        name: { full: 'username', short: 'username' },
        acceptMultipleValues: false,
        isRequired: false,
        valueIsRequired: true,
      },
      {
        name: { full: 'email', short: 'email' },
        acceptMultipleValues: false,
        isRequired: false,
        valueIsRequired: true,
      },
    ])
    .action(options => {
      requireGit(shell)
      const { username, email } = options

      if (username) {
        shell.exec(`git config --global user.name "${username}"`)
        shell.echo(logMessage.success + `username is set to '${username}'`)
      }

      if (email) {
        shell.exec(`git config --global user.email "${email}"`)
        shell.echo(logMessage.success + `email is set to '${email}'`)
      }
    })
}
