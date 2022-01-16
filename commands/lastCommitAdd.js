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

    shell.echo(message.success + 'Staged changes added to the latest commit')
  },
}

function lastCommitAdd(program) {
  prepareCommand(program, command)
}

module.exports = { lastCommitAdd }
