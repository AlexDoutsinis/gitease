const { message } = require('../utils/message')

function getCurrentBranch(shell) {
  const currentBranch = shell.exec('git symbolic-ref --short -q HEAD', {
    silent: true,
  })

  if (currentBranch.code != 0) {
    shell.echo(message.error + 'Can not find current branch')
    shell.exit(1)
    return null
  }

  const currentBranchTrimmed = currentBranch.replace(/\n/g, '')

  return currentBranchTrimmed
}

module.exports = { getCurrentBranch }
