const colors = require('colors')

function requireOption(shell, opt) {
  const { definition, value } = opt

  if (!value) {
    shell.echo('Error: '.red + `Missing required option '${definition}'`)
    shell.exit(1)
  }
}

module.exports = { requireOption }
