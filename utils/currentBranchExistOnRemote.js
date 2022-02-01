const { getCurrentBranch } = require('./getCurrentBranch')

function currentBranchExistOnRemote(shell) {
  const currentBranch = getCurrentBranch(shell)
  const remoteOrigin = shell.exec('git config --get remote.origin.url', { silent: true })

  const res = shell.exec(`git ls-remote --heads ${remoteOrigin}`, {
    silent: true,
  })

  const exist = res.includes(currentBranch)

  return exist
}

module.exports = { currentBranchExistOnRemote }

// TODO: create a 'branchExistOnRemote' util
