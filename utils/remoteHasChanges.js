const { getCurrentBranch } = require('./getCurrentBranch')

function remoteHasChanges(shell) {
  const currentBranch = getCurrentBranch(shell)
  const res = shell.exec(`git fetch origin ${currentBranch}`, { silent: true })
  const exist = res.includes('remote')

  return exist
}

module.exports = { remoteHasChanges }
