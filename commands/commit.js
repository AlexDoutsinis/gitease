const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { requireArgument } = require('../utils/requireArgument')
const { message } = require('../utils/message')
const { stash } = require('../utils/stash')
const { stashPop } = require('../utils/stashPop')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { pull } = require('../utils/pull')

const command = {
  name: 'commit',
  description:
    'Create a commit after updating from remote branch. Pulling before creating a new commit can tremendously reduce future conflicts.',
  arg: '[commitMessage]',
  async action(commitMessage) {
    requireGit(shell)
    requireArgument(shell, { name: 'commitMessage', value: commitMessage })
    const currentBranch = getCurrentBranch(shell)
    const { changesAreStashed } = stash(shell)

    await pull(shell, currentBranch)

    const res = shell.exec(`git commit -m "${commitMessage}"`, { silent: true })
    const noChanges = res.toLowerCase().includes('nothing to commit')
    const changesAreNotStaged = res.toLowerCase().includes('not staged')

    if (changesAreStashed) {
      await stashPop(shell)
    }

    if (noChanges) {
      shell.echo(message.info + 'There are no changes to commit')
      shell.exit(1)
    }

    if (changesAreNotStaged) {
      shell.echo(
        message.info + 'Please stage some changes in order to create a new commit',
      )
      shell.exit(1)
    }

    shell.echo(message.success + 'The commit is created')
  },
}

function commit(program) {
  prepareCommand(program, command)
}

module.exports = { commit }
