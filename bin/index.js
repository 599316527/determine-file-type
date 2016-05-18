#!/usr/bin/env node

var fs = require('fs')
var determine = require('../lib/determine')
var argv = require('optimist').argv

const BUFF_LEN = 256
console.log(argv.file)

new Promise((resolve, reject) => {
  fs.open(argv.file, 'r', (err, fd) => {
    if (err) {
      throw err
    } else {
      resolve(fd)
    }
  })
}).then(function (fd) {
  var buff = new Buffer(BUFF_LEN)
  return new Promise((resolve, reject) => {
    fs.read(fd, buff, 0, BUFF_LEN, 0, (err, bytesRead, buffer) => {
      if (err) {
        throw err
      }
      resolve(buffer2array(buffer))
    })
  })
}).then(function (buff) {
  var magic = determine(buff)
  if (magic) {
    // TODO: print version as well
    console.log(magic.extension, magic.mime)
  } else {
    console.log('Unknown type')
  }
}).catch(function (err) {
  console.log(err.stack)
})

function buffer2array(buffer) {
  var arr = []
  for (var value of buffer.values()) {
    arr.push(value)
  }
  return arr
}
