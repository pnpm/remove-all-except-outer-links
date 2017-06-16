'use strict'
const test = require('tape')
const removeAllExceptOuterLinks = require('..')
const pnpm = require('pnpm')
const path = require('path')
const exists = require('path-exists')

const fixtureDir = path.join(__dirname, 'fixture')
const modules = path.join(fixtureDir, 'node_modules')

test('remove all from a node_modules external symlinks', t => {
  pnpm.install({cwd: fixtureDir})
    .then(() => pnpm.link(path.join(__dirname, '..'), fixtureDir))
    .then(() => pnpm.link(path.join(__dirname, 'scoped-pkg'), fixtureDir))
    .then(() => pnpm.install({prefix: fixtureDir}))
    .then(() => removeAllExceptOuterLinks(modules))
    .then(() => {
      t.ok(exists.sync(path.join(modules, 'is-negative')))
      t.ok(!exists.sync(path.join(modules, '@types')))
      t.ok(!exists.sync(path.join(modules, '.modules.yaml')))
      t.ok(!exists.sync(path.join(modules, '.shrinkwrap.yaml')))
      t.ok(exists.sync(path.join(modules, 'remove-all-except-outer-links')))
      t.ok(exists.sync(path.join(modules, '@scoped', 'pkg')))
      t.end()
    })
    .catch(t.end)
})
