const system = require('./system')
const Team = require('./schemas/team')

module.exports = (app) => {
  app.post('/api/team', (req, res) => {
    const teamName = req.body.name
    if (!teamName) {
      return res.json({ success: false, message: 'Missing name.' })
    }

    const team = new Team({ name: teamName, errs: 0 })

    team.save()
    .then((t) => res.json({ success: true, team: t }))
    .catch(err => res.json({ success: false, message: `Error: ${err}` }))
  })

  app.get('/api/team', (req, res) => {
    Team.find()
    .then(teams => res.json({ success: true, teams }))
    .catch(err => res.json({ success: false, message: `Error: ${err}` }))
  })

  app.post('/api/compile/:lang', (req, res) => {
    const code = req.body
    system.compile(code, req.params.lang).then(out => {
      res.json(out)
    }).catch(err => console.error(err))
  })

  app.post('/api/command', (req, res) => {
    const cmd = req.body.cmd
    if (!cmd) {
      return res.json({
        success: false,
        message: 'No command specified.',
      })
    }
    
    system.cmd(cmd)
    .then(out => res.json(out))
    .catch(err => console.error(err))
  })
}