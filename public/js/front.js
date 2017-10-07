/* global $, document, Chart, LINECHART, data, options, window */
$(document).ready(function () {
  'use strict'

    // Main Template Color
  var brandPrimary = '#33b35a'

    // ------------------------------------------------------- //
    // Custom Scrollbar
    // ------------------------------------------------------ //

  if ($(window).outerWidth() > 992) {
    $('nav.side-navbar').niceScroll({
      cursorcolor: brandPrimary,
      cursorwidth: '3px',
      cursorborder: 'none'
    })
  }

    // ------------------------------------------------------- //
    // Side Navbar Functionality
    // ------------------------------------------------------ //
  $('#toggle-btn').on('click', function (e) {
    e.preventDefault()

    if ($(window).outerWidth() > 1194) {
      $('nav.side-navbar').toggleClass('shrink')
      $('.page').toggleClass('active')
    } else {
      $('nav.side-navbar').toggleClass('show-sm')
      $('.page').toggleClass('active-sm')
    }
  })

    // ------------------------------------------------------- //
    // Login  form validation
    // ------------------------------------------------------ //
  $('#login-form').validate({
    messages: {
      username: 'please enter your username',
      password: 'please enter your password'
    }
  })

    // ------------------------------------------------------- //
    // Transition Placeholders
    // ------------------------------------------------------ //
  $('input').on('focus', function () {
    $(this).siblings('.label-custom').addClass('active')
  })

  $('input').on('blur', function () {
    $(this).siblings('.label-custom').removeClass('active')

    if ($(this).val() !== '') {
      $(this).siblings('.label-custom').addClass('active')
    } else {
      $(this).siblings('.label-custom').removeClass('active')
    }
  })

    // ------------------------------------------------------- //
    // External links to new window
    // ------------------------------------------------------ //

  $('.external').on('click', function (e) {
    e.preventDefault()
    window.open($(this).attr('href'))
  })
})
