function branchExist(shell, branch) {
  const res = shell.exec('git branch --list')
  const exist = res.includes(branch)

  return exist
}

module.exports = { branchExist }
