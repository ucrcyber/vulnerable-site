'use strict'

const { ensureLoggedIn } = require('connect-ensure-login')
const router = require('express').Router()
const passport = require('../lib/passport')

router.get('/', ensureLoggedIn(), (req, res) => {
  res.render('index')
})

router.get('/forms', ensureLoggedIn(), (req, res) => {
  return res.render('forms')
})

router.get('/tables', ensureLoggedIn(), (req, res) => {
  return res.render('tables')
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
