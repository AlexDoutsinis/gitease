import { hashTable } from './hashTable.js'
import { logMessage } from './logMessage.js'
import colors from 'colors'
import inquirer from 'inquirer'

export async function logConflictedFiles(shell, files) {
  if (!files || files.length < 1) return
  const filesHt = hashTable()

  shell.echo(logMessage.info + 'Please resolve the conflicts:')

  files.forEach((file, index) => {
    const num = `${index + 1}.`.blue.bold
    filesHt.add(index + 1, file)

    shell.echo(`${num} ${file}`)
  })

  function isNumber(str) {
    if (str === '') return 'This value is required'
    const isNumber = !isNaN(str) && !isNaN(parseFloat(str))
    if (!isNumber) return 'Please enter a valid number'

    return true
  }

  async function dialog() {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message:
          'Pick a number to open the file with Visual Studio Code or to continue with the next step if you have resolved the conflicts \n',
        validate: isNumber,
      },
    ])

    const file = filesHt.search(input.value)
    if (file == null) return await dialog()

    shell.exec(`code ${file}`)
  }

  for (let index = 0; index < Object.keys(filesHt.values).length; index++) {
    await dialog()
  }
}
