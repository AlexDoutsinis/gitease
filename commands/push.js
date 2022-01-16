const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { message } = require('../utils/message')
const { stash } = require('../utils/stash')
const { stashPop } = require('../utils/stashPop')
const { currentBranchExistOnRemote } = require('../utils/currentBranchExistOnRemote')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { pull } = require('../utils/pull')

const command = {
  name: 'push',
  description: 'Push local branch changes to remote branch after updating from it',
  async action() {
    requireGit(shell)
    const currentBranch = getCurrentBranch(shell)
    const { changesAreStashed } = stash(shell)

    if (currentBranchExistOnRemote(shell)) {
      shell.echo(
        message.info +
          'Remote branch exits. Pull changes from remote before pushing the changes',
      )

      await pull(shell, currentBranch)
    } else {
      shell.echo(
        message.info + 'Remote branch does not exists. Push current changes to remote',
      )
    }

    shell.exec(`git push origin -u ${currentBranch}`)

    if (changesAreStashed) {
      await stashPop(shell)
    }
  },
}

function push(program) {
  prepareCommand(program, command)
}

module.exports = { push }

//direction 2
