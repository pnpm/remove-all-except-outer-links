'use strict'
const fs = require('mz/fs')
const path = require('path')
const pFilter = require('p-filter')
const rimraf = require('rimraf-then')
const getLinkTarget = require('get-link-target')

module.exports = function (modulesDir) {
  return fs.readdir(modulesDir)
    .then(dirs => {
      return pFilter(
        dirs.map(relativePath => path.join(modulesDir, relativePath)),
        absolutePath => {
          return fs.lstat(absolutePath)
            .then(stats => {
              if (!stats.isSymbolicLink()) return true

              return getLinkTarget(absolutePath)
                .then(targetPath => {
                  return targetPath.startsWith(modulesDir)
                })
            })
        }
      )
    })
    .then(innerResources => {
      return Promise.all(innerResources.map(absolutePath => rimraf(absolutePath)))
    })
}
