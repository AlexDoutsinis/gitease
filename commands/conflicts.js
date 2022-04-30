import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { requireVsCode } from '../utils/requireVsCode.js'
import { getConflictedFiles } from '../utils/getConflictedFiles.js'
import { logConflictedFiles } from '../utils/logConflictedFiles.js'
import { logMessage } from '../utils/logMessage.js'
import { shellExit } from '../utils/shellExit.js'

export function conflicts(program) {
  program
    .command({ name: 'conflicts', description: 'Search for all conflicting files' })
    .argument({ name: 'pattern', description: 'Search pattern', isRequired: true })
    .action(pattern => {
      requireGit(shell)
      requireVsCode(shell)

      const files = getConflictedFiles(shell, pattern)
      const hasConflicts = files.length > 0

      if (!hasConflicts) {
        shell.echo(logMessage.info + 'No conflicts found')
        shellExit(shell)
      }

      logConflictedFiles(shell, files)
    })
}
