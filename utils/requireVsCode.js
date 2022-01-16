function requireVsCode(shell) {
  if (!shell.which('code')) {
    shell.echo('Sorry, this command requires Visual Studio Code')
    shell.exit(1)
  }
}

module.exports = { requireVsCode }
