const { message } = require('./message')
const { hashTable } = require('./hashTable')
const { isNumber } = require('./isNumber')
const inquirer = require('inquirer')

async function showConflicts(shell, pattern) {
  const resFiles = shell.find(pattern).filter(file => {
    try {
      const grepRes = shell.grep('--', '<<<<<<<', file)
      const grepResTrimmed = grepRes.replace(/\n/g, '')

      if (grepResTrimmed != '') {
        return file
      }
    } catch (err) {
      return
    }
  })

  if (resFiles.length < 1) return false

  const files = hashTable()

  resFiles.forEach((file, index) => {
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
