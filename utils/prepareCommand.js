function prepareCommand(program, command) {
  if (command.arg == undefined) {
    program
      .command(command.name)
      .description(command.description)
      .action(command.action)

    return
  }

  program
    .command(command.name)
    .description(command.description)
    .argument(command.arg)
    .action(command.action)
}

module.exports = { prepareCommand }
