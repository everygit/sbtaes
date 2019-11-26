#!/usr/bin/env node

if (process.argv.length <= 2) {
  require('../src/sbtaes_repl')
} else {
  require('../src/sbtaes_args')
}