#!/usr/bin/env node
import program from 'izicli'
import { commit } from '../commands/commit.js'
import { discard } from '../commands/discard.js'
import { lastCommitAdd } from '../commands/lastCommitAdd.js'
import { lastCommitRename } from '../commands/lastCommitRename.js'
import { push } from '../commands/push.js'
import { refresh } from '../commands/refresh.js'

program.version('2.1.0')

// commands
commit(program)
// conflicts(program)
refresh(program)
// gitUser(program)
discard(program)
// switchBranch(program)
push(program)
lastCommitAdd(program)
lastCommitRename(program)
// showGitUser(program)

program.parse(process.argv)
