const exec = require('child_process').exec
const fs = require('fs')
const build = require('./buildscripts')

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
        fs.unlink('tmp/Main.java', () => {})
        fs.unlink('tmp/Main.class', () => {})
        resolve(out)
      })      
    })
  })
}

const compileJs = (code) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('tmp/main.js', code, (writeErr) => {
      if (writeErr) {
        reject({ success: false, message: 'Failed to write file' })
      }

      const buildString = build.js('main')
      execCmd(buildString).then(out => {
        fs.unlink('tmp/main.js', () => {})
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
        fs.unlink('tmp/main.exe', () => {})        
        fs.unlink('tmp/main.o', () => {})
        fs.unlink('tmp/main.hi', () => {})
        fs.unlink('tmp/main.hs', () => {})
        resolve(out)
      })
    })
  })
}

const compile = (code, lang) => {
  switch (lang) {
    case 'java':
      return compileJava(code)
    case 'javascript':
      return compileJs(code)
    case 'python':
      return compilePython(code)
    case 'haskell':
      return compileHaskell(code)
  }
}

const cmd = (command) => {
  return new Promise((resolve, reject) => {
    execCmd(command).then(out => resolve(out))
  })
}

module.exports = {
  compile,
  cmd,
}