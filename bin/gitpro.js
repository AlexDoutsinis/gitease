#!/usr/bin/env node
import program from 'izicli'
import { commit } from '../commands/commit.js'

program.version('1.0.0')

// commands
commit(program)

program.parse(process.argv)
