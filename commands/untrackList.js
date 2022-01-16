const shell = require('shelljs')
const { requireGit } = require('../utils/requireGit')
const { prepareCommand } = require('../utils/prepareCommand')
const { message } = require('../utils/message')

const command = {
  name: 'untrack-list',
  description: 'List the ignored files',
  action() {
    requireGit(shell)

    const res = shell.exec('git ls-files -v', { silent: true })
    const arr = res.split('\n')
    const untrackedList = []

    arr.forEach(file => {
      if (file.match('^h')) {
        const trimmedFile = file.replace(/h /g, '')
        untrackedList.push(trimmedFile)
      }
    })

    if (untrackedList.length < 1) {
      shell.echo(message.info + 'There are no untracked files')
      shell.exit(1)
    }

    untrackedList.forEach(file => shell.echo(file))
  },
}

function untrackList(program) {
  prepareCommand(program, command)
}

module.exports = { untrackList }
