function remoteHasChanges(shell) {
  shell.exec('git remote update', { silent: true })
  const res = shell.exec('git status -uno', { silent: true })
  const remoteHasChanges = res.includes('git pull')

  return remoteHasChanges
}

module.exports = { remoteHasChanges }
