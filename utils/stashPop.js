const { message } = require('../utils/message')
const { resolveConflicts } = require('../utils/resolveConflicts')

async function stashPop(shell) {
  shell.echo(message.info + 'Apply Stash')
  const stashPopRes = shell.exec('git stash pop', { silent: true })

  await resolveConflicts(shell, stashPopRes)
}

module.exports = { stashPop }
