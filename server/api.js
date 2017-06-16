const run = require('./system')
const Team = require('./schemas/team')

module.exports = (app) => {
  app.post('/api/team', (req, res) => {
    const teamName = req.body.name
    if (!teamName) {
      return res.json({ success: false, message: 'Missing name.' })
    }

    const team = new Team({ name: teamName, errs: 0, drinks: 0 })

    team.save()
    .then((t) => res.json({ success: true, team: t }))
    .catch(err => res.json({ success: false, message: `Error: ${err}` }))
  })

  app.get('/api/team', (req, res) => {
    Team.find()
    .then(teams => res.json({ success: true, teams }))
    .catch(err => res.json({ success: false, message: `Error: ${err}` }))
  })

  app.post('/api/compile/:lang/:token', (req, res) => {
    const code = req.body
    const token = req.params.token
    run(code, req.params.lang).then(out => {
      if (out.stderr) {
        Team.findById(token).then(t => {
          t.errs++
          t.save()
        })
      }
      res.json(out)
    }).catch(err => {
      console.log('err = ', err)
      res.json({
        stderr: 'Server error: ' + err,
      })
    })
  })

  app.get('/api/finishedbeer/:token', (req, res) => {
    Team.findById(req.params.token).then(t => {
      t.drinks++
      t.save().then(result => {
        console.log(t, result)
        res.json({
          success: true,
          message: 'updated drinks',
        })
      })
    })
  })

  app.get('/api/error/:token', (req, res) => {
    Team.findById(req.params.token).then(t => {
      t.errs++
      t.save().then(result => {
        res.json({
          success: true,
          message: 'updated errors',
        })
      })
    })
  })
}
