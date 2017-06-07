const path = require('path')
const filepath = name => path.join(__dirname, `tmp/${filename}`)

const java = (filename) => {
  return `javac ${filepath(filename)}.java & java -cp tmp ${filename}`
}

const js = (filename) => {
  return `node ${filepath(filename)}.js`
}

const python = (filename) => {
  return `py ${filepath(filename)}.py`
}

const haskell = (filename) => {
  return `ghc --make ${filepath(filename)}.hs & ${filepath(filename)}.exe`
}

const go = (filename) => {
  return `go run ${filepath(filename)}`
}

module.exports = {
  java,
  js,
  go,
  python,
  haskell,
}
