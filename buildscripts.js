const java = (filename) => {
  return `javac tmp\\${filename}.java & java -cp tmp ${filename}`
}

const js = (filename) => {
  return `node tmp\\${filename}.js`
}

const python = (filename) => {
  return `py tmp\\${filename}.py`
}

const haskell = (filename) => {
  return `ghc --make tmp\\${filename}.hs & tmp\\${filename}.exe`
}

module.exports = {
  java,
  js,
  python,
  haskell,
}