const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')

const command = {
  name: 'discard',
  description: 'Undo any modifications since the last commit',
  arg: '[files...]',
  action(files) {
    requireGit(shell)
    requireArgument(shell, { name: 'files', value: files })

    files.foreach(file => discardFile(file))

    const discardFile = file => {
      const resetRes = shell.exec(`git reset HEAD ${file}`, { silent: true })
      if (resetRes.code === 0) {
        const checkoutRes = shell.exec(`git checkout -- ${file}`, {
          silent: true,
        })

        if (checkoutRes == 0) {
          shell.echo(message.success + `'${file}' discarded`)
        }
      }
    }
  },
}

function discard(program) {
  prepareCommand(program, command)
}

module.exports = { discard }
// <<<<<<<
