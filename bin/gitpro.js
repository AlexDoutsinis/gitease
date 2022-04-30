#!/usr/bin/env node
import program from 'izicli'
import { commit } from '../commands/commit.js'
import { conflicts } from '../commands/conflicts.js'
import { refresh } from '../commands/refresh.js'

program.version('1.0.0')

// commands
commit(program)
conflicts(program)
refresh(program)

program.parse(process.argv)
