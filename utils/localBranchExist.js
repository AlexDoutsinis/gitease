export function localBranchExist(shell, localBranch) {
  const localBranches = shell.exec('git branch --list', { silent: true })
  const exist = localBranches.includes(localBranch)

  return exist
}
