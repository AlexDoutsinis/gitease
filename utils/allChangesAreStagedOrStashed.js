export function allChangesAreStagedOrStashed(shell) {
  const status = shell.exec('git status', { silent: true })

  return status.includes('working tree clean')
}
