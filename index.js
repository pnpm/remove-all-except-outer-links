'use strict'
const fs = require('mz/fs')
const path = require('path')
const pFilter = require('p-filter')
const rimraf = require('rimraf-then')
const resolveLinkTarget = require('resolve-link-target')
const isSubdir = require('is-subdir')

module.exports = async function (modulesDir) {
  const dirs = []
  for (const dir of await fs.readdir(modulesDir)) {
    if (dir[0] === '@') {
      for (const subdir of await fs.readdir(path.join(modulesDir, dir))) {
        dirs.push(path.join(dir, subdir))
      }
    } else {
      dirs.push(dir)
    }
  }
  const innerResources = await pFilter(
    dirs.map(relativePath => path.join(modulesDir, relativePath)),
    async (absolutePath) => {
      const stats = await fs.lstat(absolutePath)
      if (!stats.isSymbolicLink()) return true

      const targetPath = await resolveLinkTarget(absolutePath)
      return isSubdir(modulesDir, targetPath)
    }
  )
  return Promise.all(innerResources.map(rimraf))
}
