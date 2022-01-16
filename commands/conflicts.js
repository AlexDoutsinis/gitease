const shell = require('shelljs')
const colors = require('colors')
const { requireGit } = require('../utils/requireGit')
const { requireVsCode } = require('../utils/requireVsCode')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')
const { showConflicts } = require('../utils/showConflicts')

const command = {
  name: 'conflicts',
  description: 'Search for all conflicting files',
  arg: '[pattern]',
  async action(pattern) {
    requireGit(shell)
    requireVsCode(shell)
    requireArgument(shell, { name: 'pattern', value: pattern })

    const hasConflicts = await showConflicts(shell, pattern)

    if (!hasConflicts) {
      shell.echo(message.info + 'No conflicts found')
    }
  },
}

function conflicts(program) {
  prepareCommand(program, command)
}

module.exports = { conflicts }
