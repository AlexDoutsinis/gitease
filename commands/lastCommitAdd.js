import shell from 'shelljs'
import { requireGit } from '../utils/requireGit.js'
import { stageFiles } from '../utils/stageFiles.js'

export function lastCommitAdd(program) {
  program
    .command({
      name: 'last-commit-add',
      description: 'Add files to the latest commit',
    })
    .argument({ name: 'files', isRequired: true, acceptMultipleValues: true })
    .action(files => {
      requireGit(shell)
      stageFiles(shell, files)

      shell.exec('git commit --amend --no-edit')
    })
}
