import { shellExit } from './shellExit.js'

export function requireVsCode(shell) {
  if (!shell.which('code')) {
    shell.echo('Sorry, this command requires Visual Studio Code')
    shellExit(shell)
  }
}
