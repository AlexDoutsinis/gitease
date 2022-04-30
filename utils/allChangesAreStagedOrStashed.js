export function allChangesAreStagedOrStashed(shell) {
  const res = shell.exec('git status')

  return res.includes('not staged for commit')
}
