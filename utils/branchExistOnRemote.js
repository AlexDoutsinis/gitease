export function branchExistOnRemote(shell, branch) {
  const remoteOrigin = shell.exec('git config --get remote.origin.url', { silent: true })
  const remoteBranches = shell.exec(`git ls-remote --heads ${remoteOrigin}`, {
    silent: true,
  })
  const exist = remoteBranches.includes(branch)

  return exist
}
