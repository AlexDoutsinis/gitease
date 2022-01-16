const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')

const command = {
  name: 'last-commit-rename',
  description: 'Renames the latest commit',
  arg: '[name]',
  action(name) {
    requireGit(shell)
    requireArgument(shell, { name: 'name', value: name })

    const res = shell.exec(`git commit --amend -m "${name}"`, { silent: true })

    if (res.code == 0) {
      shell.echo(message.success + 'Latest commit renamed')
      shell.exit(1)
    }

    shell.echo(message.error + 'Latest commit could not be renamed')
  },
}

function lastCommitRename(program) {
  prepareCommand(program, command)
}

module.exports = { lastCommitRename }
