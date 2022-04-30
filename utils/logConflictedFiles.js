import { hashTable } from './hashTable.js'
import { logMessage } from './logMessage.js'
import colors from 'colors'
import inquirer from 'inquirer'
import { nextLine } from './nextLine.js'

export async function logConflictedFiles(shell, files) {
  if (!files || files.length < 1) return
  const filesHt = hashTable()

  shell.echo(logMessage.info + 'Resolve merge conflicts:')

  files.forEach((file, index) => {
    const num = `${index + 1}.`.blue.bold
    filesHt.add(index + 1, file)

    shell.echo(`${num} ${file}`)
  })

  async function dialog() {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message: 'Pick a number to open with Visual Studio Code',
        validate: isNumber,
      },
    ])

    nextLine(shell)

    const file = filesHt.search(input.value)
    if (file == null) return await dialog()

    shell.exec(`code ${file}`)
  }

  for (let index = 0; index < Object.keys(files.values).length; index++) {
    await dialog()
  }
}
