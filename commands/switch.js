const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')
const { stash } = require('../utils/stash')
const { stashPop } = require('../utils/stashPop')
const { branchExist } = require('../utils/branchExists')

const command = {
  name: 'switch',
  description:
    'Switch branches easily. Takes care of stashing changes and creating a new branch if required.',
  arg: '[branch]',
  async action(branch) {
    requireGit(shell)
    requireArgument(shell, { name: 'branch', value: branch })
    const { changesAreStashed } = stash(shell)

    if (branchExist(shell, branch)) {
      shell.echo(message.info + `Branch '${branch}' already exists. Switch to it`)
      shell.exec(`git checkout ${branch}`, { silent: true })
    } else {
      shell.echo(
        message.info + `Branch '${branch}' does not exists. Create the branch and switch`,
      )
      shell.exec(`git checkout -b ${branch}`, { silent: true })
    }

    if (changesAreStashed) {
      await stashPop(shell)
    }
  },
}

function switchBranch(program) {
  prepareCommand(program, command)
}

module.exports = { switchBranch }
