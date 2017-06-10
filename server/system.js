const exec = require('child_process').exec
const path = require('path')
const fs = require('fs-extra')

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
    case 'java':
      return run('java:9 /bin/bash -c "javac Main.java && java Main"')
    case 'c':
      return run('gcc:4.9 /bin/bash -c "gcc -o main main.c && ./main"')
    case 'haskell':
      return run('haskell:8 /bin/bash -c "ghc --make main.hs -o main>/dev/null && ./main"')
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

const filenames = {
  python: 'main.py',
  java: 'Main.java',
  node: 'main.js',
  haskell: 'main.hs',
  c: 'main.c',
  golang: 'main.go',
}

const compile = (code, lang) => {
  if (!filenames[lang]) {
    return new Promise((res, rej) => {
      rej('Language unavailable')
    })
  }

  return mktemp(folder => {
    const fp = path.join(folder, filenames[lang])
    return new Promise((resolve, reject) =>
      fs.writeFile(fp, code, err => {
        if (err) reject(err)
        const proc = dockerize(lang, folder)
        resolve(proc)
      })
    )
  })
}

const cmd = (command) => execCmd(command).then(out => resolve(out))

module.exports = {
  compile,
  cmd,
}
