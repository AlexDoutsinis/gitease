const { message } = require('../utils/message')
const { resolveConflicts } = require('../utils/resolveConflicts')

async function pull(shell, branch) {
  shell.echo(message.info + `Pulling from '${branch}'`)
  const pullRes = shell.exec(`git pull --rebase origin ${branch}`, { silent: true })

  await resolveConflicts(shell, pullRes)
}

module.exports = { pull }
