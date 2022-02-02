const { message } = require('../utils/message')
const { resolveConflicts } = require('../utils/resolveConflicts')
const { remoteHasChanges } = require('./remoteHasChanges')

async function pull(shell, branch) {
  if (!remoteHasChanges(shell)) return

  shell.echo(message.info + `Pulling from '${branch}'`)
  const pullRes = shell.exec(`git pull --rebase origin ${branch}`, { silent: true })

  await resolveConflicts(shell, pullRes)
}

module.exports = { pull }
