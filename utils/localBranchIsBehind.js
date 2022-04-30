export function localBranchIsBehind(shell) {
  shell.exec('git remote update', { silent: true })
  const res = shell.exec('git status -uno', { silent: true })
  const isBehind = res.includes('git pull')

  return isBehind
}
