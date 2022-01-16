const shell = require('shelljs')
const colors = require('colors')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')

const command = {
  name: 'log',
  description: 'List the last 15 commits',
  action() {
    requireGit(shell)

    const part1 = `git log -15 --pretty=format:`
    const part2 = `%Cred%h%Creset`
    const part3 =
      JSON.stringify(' -') + JSON.stringify('%C(yellow)%d%Creset').yellow
    const part4 = JSON.stringify(' %s') + JSON.stringify(' %Cgreen(%cr)').green
    const part5 = JSON.stringify(' %C(bold blue)<%an>%Creset').blue.bold
    const part6 = ' --abbrev-commit'
    const craftedCommand = part1 + part2 + part3 + part4 + part5 + part6

    shell.exec(craftedCommand)
  },
}

function log(program) {
  prepareCommand(program, command)
}

module.exports = { log }
