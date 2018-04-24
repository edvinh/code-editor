const run = require('./system')
const Team = require('./schemas/team')

module.exports = app => {
  app.post('/api/team', async (req, res) => {
    const teamName = req.body.name
    if (!teamName) {
      return res.json({ success: false, message: 'Missing name.' })
    }

    try {
      const team = new Team({ name: teamName, errs: 0, drinks: 0 })
      await team.save()
      res.json({ success: true, team })
    } catch (err) {
      res.json({ success: false, message: `Error: ${err}` })
    }
  })

  app.get('/api/team', async (req, res) => {
    try {
      const teams = await Team.find()
      res.json({ success: true, teams })
    } catch (err) {
      res.json({ success: false, message: `Error: ${err}` })
    }
  })

  app.post('/api/compile/:lang/:token', async (req, res) => {
    const code = req.body
    const token = req.params.token
    try {
      const out = await run(code, req.params.lang)

      if (out.stderr) {
        const team = await Team.findById(token)
        team.errs++
        team.save()
      }

      res.json(out)
    } catch (err) {
      console.log('err = ', err)
      res.json({
        stderr: 'Server error: ' + err,
      })
    }
  })

  app.get('/api/finishedbeer/:token', async (req, res) => {
    try {
      const t = await Team.findById(req.params.token)
      t.drinks++
      await t.save()
      res.json({
        success: true,
        message: 'updated drinks',
      })
    } catch (err) {
      console.log(err)
      res.json({
        stderr: 'Server error: ' + err,
      })
    }
  })

  app.get('/api/error/:token', async (req, res) => {
    const t = await Team.findById(req.params.token)
    t.errs++
    await t.save()
    res.json({
      success: true,
      message: 'updated errors',
    })
  })
}
