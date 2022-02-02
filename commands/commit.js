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
    'Create a commit after staging and updating from remote branch. Pulling before creating a new commit can tremendously reduce future conflicts.',
  opts: [
    { definition: '-a, --add <files...>', description: 'add/stage files' },
    { definition: '-m, --message <message>', description: 'commit message' },
  ],
  async action({ add: files, message }) {
    requireGit(shell)
    const currentBranch = getCurrentBranch(shell)
    const { changesAreStashed } = stash(shell)

    await pull(shell, currentBranch)

    if (changesAreStashed) {
      await stashPop(shell)
    }

    files.forEach(file => {
      shell.exec(`git add ${file}`)
    })

    const res = shell.exec(`git commit -m "${message}"`, { silent: true })
    const noChanges = res.toLowerCase().includes('nothing to commit')
    const changesAreNotStaged = res.toLowerCase().includes('not staged')

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

// TODO: create a 'stashUnstagedChanges' util
