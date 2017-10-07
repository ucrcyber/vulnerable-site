'use strict'

const router = require('express').Router()
const passport = require('../lib/passport')

router.get('/', (req, res) => res.render('index'))

router.get('/forms', (req, res) => {
  return res.render('forms')
})

router.get('/tables', (req, res) => {
  return res.render('tables')
})

router.get('/login', (req, res) => {
  return res.render('login', { layout: false })
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  return res.render('login', { layout: false })
})

module.exports = router
