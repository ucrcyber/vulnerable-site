'use strict'

// Prevent standards linter from complaining
var $ = window.jQuery

$(function () {
  $('a.forgot-pass').click(function (evt) {
    evt.preventDefault()
    alert("Too bad, we don't allow password recoveries for security reasons.")
  })
})
