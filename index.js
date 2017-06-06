const express = require('express')
const bodyParser = require('body-parser')
const system = require('./system')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/api/compile/:lang', (req, res) => {
  const code = req.body
  system.compile(code, req.params.lang).then(out => {
    res.json(out)
  })
})

app.post('/api/command', (req, res) => {
  const cmd = req.body.cmd
  if (!cmd) {
    return res.json({
      success: false,
      message: 'No command specified.',
    })
  }
  system.cmd(cmd).then(out => {
    res.json(out)
  })
})

app.listen(3001)