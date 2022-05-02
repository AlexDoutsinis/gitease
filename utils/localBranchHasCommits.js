export function localBranchHasCommits(shell) {
  const status = shell.exec('git status', { silent: true })

  return status.includes('publish')
}
