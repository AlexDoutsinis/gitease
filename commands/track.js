const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')

const command = {
  name: 'track',
  description: 'Track again an untracked file',
  arg: '[file]',
  action(file) {
    requireGit(shell)
    requireArgument(shell, { name: 'file', value: file })

    const res = shell.exec(`git update-index --no-assume-unchanged ${file}`)

    if (res.code != 0) {
      shell.echo(message.error + `'${file}' can not be tracked`)
      shell.exit(1)
    }

    shell.echo(message.success + `Tracking '${file}'`)
  },
}

function track(program) {
  prepareCommand(program, command)
}

module.exports = { track }
