/* eslint-env browser, node */
/* global Uint32Array */

'use strict'

var englishWords = [].concat(
  require('wordlist-english/english-words-10.json'),
  require('wordlist-english/english-words-20.json'),
  require('wordlist-english/english-words-35.json'),
  require('wordlist-english/american-words-10.json'),
  require('wordlist-english/american-words-20.json'),
  require('wordlist-english/american-words-35.json')
)

function randomFloat () {
  var arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] / (0xffffffff + 1)
}

function randomInt (min, max) {
  return Math.floor(randomFloat() * (max - min)) + min;
}

function alphanumeric (len) {
  var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var retVal = ''
  for (var i = 0, n = charset.length; i < len; ++i) {
    retVal += charset.charAt(Math.floor(randomFloat() * n))
  }
  return retVal
}

function words (len) {
  var retVal = ''
  for (var i = 0, n = englishWords.length; i < len; ++i) {
    retVal += englishWords[randomInt(0, n)]
    if (i < len - 1) retVal += ' '
  }
  return retVal
}

function generateSecurePassword () {
  return alphanumeric(randomInt(16, 33))
}

function generateFriendlyPassword () {
  return words(randomInt(4, 7))
}

function regenerate () {
  document.querySelector('#secure-password').value = generateSecurePassword()
  document.querySelector('#friendly-password').value = generateFriendlyPassword()
}

document.querySelector('#regenerate').addEventListener('click', regenerate)

regenerate()
