const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const build = require('./buildscripts')

/* Proof of concept, not the prettiest code */

const execCmd = (buildString) => {
  return new Promise ((resolve, reject) => {
    let timestamp = Date.now()
    exec(buildString, (err, stdout, stderr) => {
      if (err) {
        return resolve({
          success: false,
          err,
          stdout,
          stderr,
          runtime: Date.now() - timestamp,
        })
      }

      return resolve({
        success: true,
        stdout,
        err,
        stderr,
        runtime: Date.now() - timestamp,
      })
    })
  })
}

const compileJava = (code) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('tmp/Main.java', code, (writeErr) => {
      if (writeErr) {
        reject({ success: false, message: 'Failed to write file' })
      }

      const buildString = build.java('Main')
      execCmd(buildString).then(out => {
        fs.unlinkSync('tmp/Main.java')
        fs.unlinkSync('tmp/Main.class')
        resolve(out)
      })      
    })
  })
}

const compileJs = (code) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, 'tmp/main.js'), code, err => {
      if (err) reject(err)

      const buildString = build.js('main')
      execCmd(buildString).then(out => {
        fs.unlinkSync('./tmp/main.js')
        resolve(out)
      })
    })
  })
}

const compilePython = (code) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('tmp/main.py', code, (writeErr) => {
      if (writeErr) {
        reject({ success: false, message: 'Failed to write file' })
      }

      const buildString = build.python('main')
      execCmd(buildString).then(out => resolve(out))
    })
  })
}

const compileHaskell = (code) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('tmp/main.hs', code, (writeErr) => {
      if (writeErr) {
        reject({ success: false, message: 'Failed to write file' })
      }

      const buildString = build.haskell('main')
      execCmd(buildString).then(out => {
        fs.unlinkSync('tmp/main.exe')        
        fs.unlinkSync('tmp/main.o')
        fs.unlinkSync('tmp/main.hi')
        fs.unlinkSync('tmp/main.hs')
        resolve(out)
      })
    })
  })
}

const compileGo = code =>
  new Promise((resolve, reject) =>
    fs.writeFile('tmp/main.go', code, err => {
      if (err) reject(err)
      execCmd(build.go('main')).then(out => {
        fs.unlinkSync('tmp/main.go')
        fs.unlinkSync('tmp/main') // build with -o flag to set output name so we dont have to check for .exe
        resolve(out)
      })
    })
  )

const buildMethods = {
  python: compilePython,
  java: compileJava,
  javascript: compileJs,
  haskell: compileHaskell,
  go: compileGo
}

const compile = (code, lang) => {
  if (!buildMethods[lang]) {
    return new Promise((res, rej) => {
      rej('Language unavailable')
    });
  }
  return buildMethods[lang](code)
}

const cmd = (command) => execCmd(command).then(out => resolve(out))

module.exports = {
  compile,
  cmd,
}
