import colors from 'colors'
import inquirer from 'inquirer'
import { logMessage } from './logMessage.js'
import { stageFiles } from './stageFiles.js'

function fileHasConflicts(shell, file) {
  const has = !!shell.grep('--', '<<<<<<<', file).replace(/\n/g, '')
  if (has) return true

  return false
}

export async function resolveConflicts(shell, merge = true) {
  const res = shell.exec('git diff --name-only --diff-filter=U', { silent: true });
  const files = res.stdout.trim().split('\n');
  const conflictedFiles = files.filter(file => fileHasConflicts(shell, file))

  if (conflictedFiles?.length > 0) {
    shell.echo(logMessage.info + 'Please resolve the conflicts in files shown bellow and then continue with the next step')

    for (let index = 0; index < conflictedFiles.length; index++) {
      const file = conflictedFiles[index];
      const num = `${index + 1}.`.blue.bold

      shell.echo(`${num} ${file}`)
    }

    const response = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'value',
        message:
          "Press any key to continue",
      },
    ])

    if (response) {
      resolveConflicts(shell, merge)
    }
  }
  else {
    stageFiles(shell, files)

    if (merge) {
      shell.exec(`git commit -m "resolve merge conflicts"`)
    }
    else {
      shell.exec('git -c core.editor=true rebase --continue')
    }
  }
}