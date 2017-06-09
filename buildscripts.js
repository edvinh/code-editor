const path = require('path')
const filepath = name => path.join(__dirname, `tmp/${name}`)

const java = (filename) => {
  return `javac ${filepath(filename)}.java & java -cp tmp ${filename}`
}

const haskell = (filename) => {
  return `ghc --make ${filepath(filename)}.hs & ${filepath(filename)}.exe`
}

module.exports = {
  java,
  haskell,
}
