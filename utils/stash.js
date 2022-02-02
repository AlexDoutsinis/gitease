const { message } = require('../utils/message')
const { remoteHasChanges } = require('./remoteHasChanges')

function stash(shell) {
  let changesAreStashed = false
  if (!remoteHasChanges(shell)) return changesAreStashed

  shell.echo(message.info + 'Stash changes')
  const stashRes = shell.exec('git stash --include-untracked', {
    silent: true,
  })

  if (stashRes.code != 0) {
    shell.echo(message.error + 'Stash failed')
    shell.exit(1)
  }

  changesAreStashed = !stashRes.stdout.toLowerCase().includes('no')

  return {
    changesAreStashed,
  }
}

module.exports = { stash }
