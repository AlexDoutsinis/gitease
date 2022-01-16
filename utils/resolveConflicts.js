const { showConflicts } = require('./showConflicts')

async function resolveConflicts(shell, res) {
  const conflictExist = res.toLowerCase().includes('conflict')

  const findConflicts = async () => {
    const conflictsFound = await showConflicts(shell, '.')
    if (conflictsFound) return await findConflicts()
  }

  if (conflictExist) {
    shell.echo(message.info + 'There are some conflicts. Resolve them:')

    await findConflicts()
  }
}

module.exports = { resolveConflicts }
