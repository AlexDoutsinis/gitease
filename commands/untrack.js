const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')

const command = {
  name: 'untrack',
  description:
    'Untrack file. Not tracking a file means that it will be ignored by git so it can not be pushed to a remote branch.',
  arg: '[target]',
  action(target) {
    requireGit(shell)
    requireArgument(shell, { name: 'target', value: target })

    const res = shell.exec(`git update-index --assume-unchanged ${target}`)

    if (res.code != 0) {
      shell.echo(message.error + `'${file}' can not be untracked`)
      shell.exit(1)
    }

    shell.echo(
      message.success + `'${target}' is added in the list with the untracked files`,
    )
  },
}

function untrack(program) {
  prepareCommand(program, command)
}

module.exports = { untrack }
