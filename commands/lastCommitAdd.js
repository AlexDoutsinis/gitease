const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { message } = require('../utils/message')

const command = {
  name: 'last-commit-add',
  description: 'Add staged changes to the latest commit',
  action() {
    requireGit(shell)

    const res = shell.exec('git commit --amend --no-edit', {
      silent: true,
    })

    if (res.code == 0) {
      shell.echo(message.success + 'Changes added to the latest commit')
      shell.exit(1)
    }

    shell.echo(message.error + 'Changes could not be added to the latest commit')
  },
}

function lastCommitAdd(program) {
  prepareCommand(program, command)
}

module.exports = { lastCommitAdd }
