export function getCurrentLocalBranch(shell) {
  const currentBranch = shell.exec('git symbolic-ref --short -q HEAD', {
    silent: true,
  })

  const currentBranchTrimmed = currentBranch.replace(/\n/g, '')

  return currentBranchTrimmed
}
