const { message } = require('./message')
const { hashTable } = require('./hashTable')
const { isNumber } = require('./isNumber')
const { getConflictedFiles } = require('./getConflictedFiles')
const inquirer = require('inquirer')

async function showConflicts(shell, pattern) {
  const conflictedFiles = getConflictedFiles(shell, pattern)

  if (conflictedFiles.length < 1) return false

  const files = hashTable()

  const conflictsText = 'conflicts'.red
  shell.echo(message.info + `There are some ${conflictsText}. Resolve them:`)

  conflictedFiles.forEach((file, index) => {
    const num = `${index + 1}.`.blue.bold
    files.add(index + 1, file)

    shell.echo(`${num} ${file}`)
  })

  shell.echo('')

  async function question() {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message: 'Pick a number to open with Visual Studio Code',
        validate: isNumber,
      },
    ])

    shell.echo('')

    const file = files.search(input.value)
    if (file == null) return await question()

    shell.exec(`code ${file}`)
  }

  for (let index = 0; index < Object.keys(files.values).length; index++) {
    await question()
  }

  return true
}

module.exports = { showConflicts }
