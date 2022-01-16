#!/usr/bin/env node
const program = require('commander')
const { version } = require('../package.json')
const { discard } = require('../commands/discard')
const { conflicts } = require('../commands/conflicts')
const { log } = require('../commands/log')
const { logAuthor } = require('../commands/logAuthor')
const { lastCommitAdd } = require('../commands/lastCommitAdd')
const { lastCommitRename } = require('../commands/lastCommitRename')
const { refresh } = require('../commands/refresh')
const { switchBranch } = require('../commands/switch')
const { push } = require('../commands/push')
const { track } = require('../commands/track')
const { untrack } = require('../commands/untrack')
const { untrackList } = require('../commands/untrackList')

program.version(version)

// Commands
discard(program)
conflicts(program)
log(program)
logAuthor(program)
lastCommitAdd(program)
lastCommitRename(program)
refresh(program)
switchBranch(program)
push(program)
track(program)
untrack(program)
untrackList(program)

program.parse(process.argv)

// TODO: commit command: pull then commit
