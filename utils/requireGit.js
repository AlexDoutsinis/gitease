import { shellExit } from './shellExit.js'

export function requireGit(shell) {
  if (!shell.which('git')) {
    shell.echo('Sorry, this tool requires git')
    shellExit(shell)
  }
}
