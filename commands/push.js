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
  description: 'Push local branch commits to remote branch after updating from it',
  async action() {
    requireGit(shell)
    const currentBranch = getCurrentBranch(shell)
    const { changesAreStashed } = stash(shell)

    if (currentBranchExistOnRemote(shell)) {
      shell.echo(
        message.info +
          'Remote branch exits. Check if pull needed before pushing the changes',
      )

      await pull(shell, currentBranch)
    } else {
      shell.echo(message.info + 'Remote branch does not exists. Push changes to remote')
    }

    const res = shell.exec(`git push origin -u ${currentBranch}`, { silent: true })
    const noCommitsToPush = res.includes('up-to-date')

    if (noCommitsToPush) {
      shell.echo(message.info + 'There are no commits to push')
    } else {
      shell.echo(
        message.success + `Commits are pushed to remote '${currentBranch}' branch`,
      )
    }

    if (changesAreStashed) {
      await stashPop(shell)
    }
  },
}

function push(program) {
  prepareCommand(program, command)
}

module.exports = { push }
