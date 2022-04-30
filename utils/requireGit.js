export function requireGit(shell) {
  if (!shell.which('git')) {
    shell.echo('Sorry, this tool requires git')
    shell.exit(1)
  }
}
