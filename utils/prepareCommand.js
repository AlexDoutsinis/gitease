function prepareCommand(program, command) {
  if (command.arg == undefined && command.opts == undefined) {
    program.command(command.name).description(command.description).action(command.action)

    return
  }

  if (command.opts != undefined && command.arg == undefined) {
    const prog = program.command(command.name).description(command.description)
    command.opts.forEach(opt => prog.option(opt.definition, opt.description))
    prog.action(command.action)

    return
  }

  program
    .command(command.name)
    .description(command.description)
    .argument(command.arg)
    .action(command.action)
}

module.exports = { prepareCommand }
