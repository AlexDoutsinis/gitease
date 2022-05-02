#!/usr/bin/env node
import program from 'izicli'
import { commit } from '../commands/commit.js'
import { conflicts } from '../commands/conflicts.js'
import { discard } from '../commands/discard.js'
import { gitUser } from '../commands/gitUser.js'
import { push } from '../commands/push.js'
import { refresh } from '../commands/refresh.js'
import { switchBranch } from '../commands/switchBranch.js'

program.version('1.0.0')

// commands
commit(program)
conflicts(program)
refresh(program)
gitUser(program)
discard(program)
switchBranch(program)
push(program)

program.parse(process.argv)
