const exec = require('child_process').exec
const path = require('path')
const fs = require('fs-extra')
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

const dockerize = (type, dir) => {
  const folderPath = path.join(__dirname, dir)
  const run = (args) =>
    execCmd(`docker run -i --rm -v ${folderPath}:/app -w /app ` + args)

  switch (type) {
    case 'node':
      return run('node:8 node main.js')
    case 'golang':
      return run('golang:1.8 go run main.go')
    case 'python':
      return run('python:3.6 python main.py')
  }
}

const mktemp = (cb) => {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(`tmp/`, (err, folder) => {
      if (err) reject(err)
      resolve(folder)
    })
  }).then(folder => {
    const cleanup = () => fs.remove(folder)
    return new Promise((resolve, reject) => {
      cb(folder)
        .then(out => resolve(out))
        .then(cleanup, cleanup)
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

const compileJs = (code) =>
  mktemp(folder => {
    const fp = path.join(folder, 'main.js')
    return new Promise((resolve, reject) =>
      fs.writeFile(fp, code, err => {
        if (err) reject(err)
        const proc = dockerize('node', folder, 'main.js')
        resolve(proc)
      })
    )
  })

const compileGo = (code) =>
  mktemp(folder => {
    const fp = path.join(folder, 'main.go')
    return new Promise((resolve, reject) =>
      fs.writeFile(fp, code, err => {
        if (err) reject(err)
        const proc = dockerize('golang', folder, 'main.go')
        resolve(proc)
      })
    )
  })


const compilePython = (code) =>
  mktemp(folder => {
    const fp = path.join(folder, 'main.py')
    return new Promise((resolve, reject) =>
      fs.writeFile(fp, code, err => {
        if (err) reject(err)
        const proc = dockerize('python', folder, 'main.py')
        resolve(proc)
      })
    )
  })

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
