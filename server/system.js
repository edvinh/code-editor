const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs-extra')

const accumulate = stream => {
  let acc = ''
  return new Promise(resolve => {
    stream.on('data', data => (acc += data.toString()))
    stream.on('end', () => resolve(acc))
  })
}

const spawnDocker = args => {
  return new Promise((resolve, reject) => {
    const starttime = Date.now()
    const child = spawn('docker', args)

    // timeout with ~500ms margin of error b/c lazy
    const timeout = 10 * 1000

    const accStdout = accumulate(child.stdout)
    const accStderr = accumulate(child.stderr)
    console.log('START')
    const id = setInterval(() => {
      if (Date.now() >= starttime + timeout) {
        console.log('deat to all')
        child.kill(9) // SIGKILL
        reject('Process took too long time to complete')
      }
    }, 500)

    return Promise.all([accStdout, accStderr]).then(
      ([stdout, stderr]) => {
        clearInterval(id)
        resolve({
          success: true,
          stdout,
          stderr,
        })
      },
      err => {
        clearInterval(id)
        reject(err)
      }
    )
  })
}

const dockerize = (type, dir) => {
  const folderPath = path.join(__dirname, dir)
  console.log(folderPath)
  const dockerArgs = [
    'run',
    '-i',
    '--rm',
    '-v',
    `${dir}:/app`,
    '-w',
    `/app`,
  ]
  const run = args => {
    console.log([...dockerArgs, ...args].join(' '))
    return spawnDocker([...dockerArgs, ...args])
  }
  switch (type) {
    case 'node':
      return run(['node', 'node', 'main.js'])
    case 'go':
      return run(['golang', 'go', 'run', 'main.go'])
    case 'python':
      return run(['python', 'python', 'main.py'])
    case 'java':
      return run(['java', '/bin/bash', '-c', 'javac Main.java && java Main'])
    case 'c':
      return run(['gcc', '/bin/bash', '-c', 'gcc -o main main.c && ./main'])
    case 'haskell':
      return run([
        'haskell:8',
        '/bin/bash',
        '-c',
        'ghc --make main.hs -o main>/dev/null && ./main',
      ])
  }
}

const mktemp = cb => {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(`${__dirname}/tmp/`, (err, folder) => {
      if (err) {
        reject(err)
      }
      resolve(folder)
    })
  }).then(folder => {
    const cleanup = () => fs.remove(folder)
    return new Promise((resolve, reject) => {
      cb(folder)
        .then(out => resolve(out), reject)
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
  go: 'main.go',
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
        if (err) {
          reject(err)
        }
        const proc = dockerize(lang, folder)
        resolve(proc)
      })
    )
  })
}

module.exports = compile
