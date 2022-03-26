function branchExist(shell, branch) {
  const localBranches = shell.exec('git branch --list', { silent: true })
  const remoteBranches = shell.exec('git branch -r', { silent: true })

  const exist = localBranches.includes(branch) || remoteBranches.includes(branch)

  return exist
}

module.exports = { branchExist }
