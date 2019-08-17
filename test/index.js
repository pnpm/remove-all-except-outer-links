'use strict'
const pnpm = require('@pnpm/exec').default
const test = require('tape')
const removeAllExceptOuterLinks = require('remove-all-except-outer-links')
const path = require('path')
const exists = require('path-exists')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

const fixtureDir = path.join(__dirname, 'fixture')
const modules = path.join(fixtureDir, 'node_modules')

test('remove all from a node_modules external symlinks', async (t) => {
  await rimraf(modules)
  await pnpm(['install', '--no-independent-leaves'], { cwd: fixtureDir })
  await pnpm(['link', '--no-independent-leaves', path.relative(fixtureDir, path.join(__dirname, 'scoped-pkg'))], { cwd: fixtureDir })
  await removeAllExceptOuterLinks(modules)
  t.ok(!exists.sync(path.join(modules, 'is-negative')))
  t.ok(!exists.sync(path.join(modules, '.modules.yaml')))
  t.ok(!exists.sync(path.join(modules, '.pnpm-lock.yaml')))
  t.ok(exists.sync(path.join(modules, '@scoped', 'pkg')))
  t.end()
})
