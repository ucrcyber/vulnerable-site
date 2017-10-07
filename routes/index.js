'use strict'

const moment = require('moment')

const { ensureLoggedIn } = require('connect-ensure-login')
const { exec } = require('child_process')

const passport = require('../lib/passport')
const logger = require('../lib/logger')
const NewsItem = require('../models/NewsItem')
const router = require('express').Router()

router.get('/', ensureLoggedIn(), async (req, res) => {
  const news = await NewsItem.findAll({ limit: 15, order: [['createdAt', 'DESC']] })
  res.render('index', { user: req.user, news })
})

router.get('/forms', ensureLoggedIn(), (req, res) => {
  return res.render('forms', { user: req.user })
})

router.get('/tables', ensureLoggedIn(), (req, res) => {
  return res.render('tables', { user: req.user })
})

router.get('/login', (req, res) => {
  if (req.user) return res.redirect('/')
  res.render('login', { layout: false })
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.post('/news', ensureLoggedIn(), async (req, res) => {
  if (!req.body || !req.body.title || !req.body.body) return res.send('Invalid form')
  await NewsItem.create({
    title: req.body.title,
    body: req.body.body,
    month: moment().format('MMM'),
    day: moment().format('D')
  })
  res.redirect('/')
})

router.post('/shell', ensureLoggedIn(), async(req, res) => {
  if (!req.body || !req.body.command) return res.json({ success: false })
  const command = `cowsay "${req.body.command}"` // Allow for command injection
  logger.debug('Executing command:', command)

  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error('Error executing command:', error)
      return res.json({ success: false, error: true })
    }
    logger.debug('stdout:', stdout)
    return res.json({ success: true, output: stdout })
  })
})

router.get('/logout', ensureLoggedIn(), (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
