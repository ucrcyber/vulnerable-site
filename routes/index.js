'use strict'

const { ensureLoggedIn } = require('connect-ensure-login')
const router = require('express').Router()
const passport = require('../lib/passport')
const NewsItem = require('../models/NewsItem')

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

router.get('/logout', ensureLoggedIn(), (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
