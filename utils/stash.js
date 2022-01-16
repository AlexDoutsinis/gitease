const { message } = require('../utils/message')

function stash(shell) {
  shell.echo(message.info + 'Stash changes')
  const stashRes = shell.exec('git stash --include-untracked', {
    silent: true,
  })

  if (stashRes.code != 0) {
    shell.echo(message.error + 'Stash failed')
    shell.exit(1)
  }

  const changesAreStashed = !stashRes.stdout.toLowerCase().includes('no')

  return {
    changesAreStashed,
  }
}

module.exports = { stash }
