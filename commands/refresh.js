const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { stash } = require('../utils/stash')
const { stashPop } = require('../utils/stashPop')
const { pull } = require('../utils/pull')
const { rebase } = require('../utils/rebase')

const command = {
  name: 'refresh',
  description: 'Refreshes the current branch from a remote branch',
  arg: '[remoteBranch]',
  async action(remoteBranch) {
    requireGit(shell)
    requireArgument(shell, { name: 'remoteBranch', value: remoteBranch })
    const currentBranch = getCurrentBranch(shell)
    const { changesAreStashed } = stash(shell)

    if (currentBranch == remoteBranch) {
      await pull(shell, remoteBranch)
    } else {
      shell.exec(`git checkout ${remoteBranch}`, { silent: true })
      await pull(shell, remoteBranch)
      shell.exec(`git checkout ${currentBranch}`, { silent: true })
      await rebase(shell, remoteBranch)
    }

    if (changesAreStashed) {
      await stashPop(shell)
    }
  },
}

function refresh(program) {
  prepareCommand(program, command)
}

module.exports = { refresh }
