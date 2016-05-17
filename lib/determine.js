
const magicList = require('./magic').map(magic => {
  magic.header = magic.header.map(header => {
    switch (header.type) {
      case 'string':
        header.bytes = header.match.split('').map(c => c.charCodeAt())
        break
      case 'byte':
        header.bytes = header.match === '?' ? [] : [header.match]
        break
      case 'bytes':
        header.bytes = header.match
        break
    }
    return header
  })
  return magic
})

function determine(buff) {
  var magic
  for (var i = 0; i < magicList.length; i++) {
    magic = magicList[i]
    if (matchHeader(buff, magic.header)) {
      return magic
    }
  }
}

function matchHeader(buff, header) {
  var matchs = header.filter(function (h) {
    if (h.bytes.length === 0) {
      return true
    }
    return compareArray(buff.slice(h.offset, h.offset + h.bytes.length), h.bytes)
  })
  return matchs.length === header.length
}

function compareArray(a, b) {
  if (a.length !== b.length) {
    return false
  }
  for (var i = a.length - 1; i >= 0; i--) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

module.exports = determine
