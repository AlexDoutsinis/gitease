const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')

const command = {
  name: 'last-commit-add',
  description: 'Add files to the latest commit',
  arg: '[files...]',
  action(files) {
    requireGit(shell)
    requireArgument(shell, { name: 'files', value: files })

    files.forEach(file => shell.exec(`git add ${file}`, { silent: true }))

    const res = shell.exec('git commit --amend --no-edit', {
      silent: true,
    })

    const msg =
      files.length > 1
        ? 'Files added to the latest commit'
        : 'File added to the latest commit'

    shell.echo(message.success + msg)
  },
}

function lastCommitAdd(program) {
  prepareCommand(program, command)
}

module.exports = { lastCommitAdd }
