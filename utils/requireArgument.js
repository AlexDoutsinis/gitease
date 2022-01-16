const colors = require('colors')

function requireArgument(shell, arg) {
  const { name, value } = arg

  if (!value) {
    shell.echo('Error: '.red + `Missing required argument '${name}'`)
    shell.exit(1)
  }
}

module.exports = { requireArgument }
