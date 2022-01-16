const { resolveConflicts } = require('./resolveConflicts')

async function rebase(shell, branch) {
  shell.echo(`Rebase ${branch}`)

  const res = shell.exec(`git rebase ${branch}`, { silent: true })
  await resolveConflicts(shell, res)
}

module.exports = { rebase }
