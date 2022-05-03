export function branchIsDiverged(shell) {
  const statusRes = shell.exec('git status', { silent: true })

  return statusRes.includes('diverged')
}
