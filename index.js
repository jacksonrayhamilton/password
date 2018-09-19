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

function symbol () {
  return randomInt(32, 127)
}

function alnum () {
  var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return charset[randomInt(0, charset.length)].charCodeAt(0)
}

function ascii (len, options) {
  var getCharCode
  if (options.symbols) getCharCode = symbol
  else getCharCode = alnum
  var retVal = ''
  for (var i = 0; i < len; ++i) {
    do var charCode = getCharCode()
    while (leadingOrTrailingSpace())
    retVal += String.fromCharCode(charCode)
  }
  function leadingOrTrailingSpace () {
    return (i === 0 || i === len - 1) && charCode === 32
  }
  return retVal
}

function intermediate1 () {
  var charset = ',:;'
  return charset[randomInt(0, charset.length)]
}

function intermediate2 () {
  var charset = '+->=<'
  return charset[randomInt(0, charset.length)]
}

function ending () {
  var charset = '!.?'
  return charset[randomInt(0, charset.length)]
}

function words (len, options) {
  var retVal = ''
  for (var i = 0, n = englishWords.length; i < len; ++i) {
    var word = englishWords[randomInt(0, n)]
    if (options.punctuation) {
      if (i === 0) word = word.slice(0, 1).toUpperCase() + word.slice(1)
      else if (i < len - 1) {
        var chance = randomInt(0, 20)
        if (chance >= 12 && chance < 18) word = word + intermediate1()
        else if (chance === 18) word = word + ' ' + intermediate2()
        else if (chance === 19) word = '(' + word + ')'
      } else word = word + ending()
    }
    retVal += word
    if (i < len - 1) retVal += ' '
  }
  return retVal
}

function generateSecurePassword (options) {
  return ascii(randomInt(16, 33), options)
}

function generateFriendlyPassword (options) {
  return words(randomInt(4, 7), options)
}

function showSecurePassword () {
  document.querySelector('#secure-password').value = generateSecurePassword({
    symbols: document.querySelector('#secure-symbols').checked
  })
}

function showFriendlyPassword () {
  document.querySelector('#friendly-password').value = generateFriendlyPassword({
    punctuation: document.querySelector('#friendly-punctuation').checked
  })
}

function showPasswords () {
  showSecurePassword()
  showFriendlyPassword()
}

document.querySelector('#secure-symbols').addEventListener('change', showSecurePassword)
document.querySelector('#friendly-punctuation').addEventListener('change', showFriendlyPassword)
document.querySelector('#regenerate').addEventListener('click', showPasswords)

showPasswords()
