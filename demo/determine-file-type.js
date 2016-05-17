(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.determineFileType = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{"./magic":2}],2:[function(require,module,exports){
const flash = require('../magic/flash')
const document = require('../magic/document')
const video = require('../magic/video')

module.exports = [].concat(flash).concat(document).concat(video)

},{"../magic/document":3,"../magic/flash":4,"../magic/video":5}],3:[function(require,module,exports){

module.exports = [
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: '%PDF',
        description: 'Adobe Portable Document Format and Forms Document file'
      }
    ],
    mime: 'application/pdf',
    extension: 'pdf'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: '.DOC',
        description: 'DeskMate Document file'
      }
    ],
    mime: 'application/msword',
    extension: 'doc'
  }
]

},{}],4:[function(require,module,exports){

module.exports = [
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'FWS',
        description: 'Macromedia Flash data'
      },
      {
        offset: 3,
        type: 'byte',
        match: '?',
        description: 'version %d'
      }
    ],
    mime: 'application/x-shockwave-flash',
    extension: 'swf'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'CWS',
        description: 'Macromedia Flash data (compressed)'
      },
      {
        offset: 3,
        type: 'byte',
        match: '?',
        description: 'version %d'
      }
    ],
    mime: 'application/x-shockwave-flash',
    extension: 'swf'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'ZWS',
        description: 'Macromedia Flash data (lzma compressed)'
      },
      {
        offset: 3,
        type: 'byte',
        match: '?',
        description: 'version %d'
      }
    ],
    mime: 'application/x-shockwave-flash',
    extension: 'swf'
  },

  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'FLV',
        description: 'Macromedia Flash Video'
      }
    ],
    mime: 'video/x-flv',
    extension: 'flv'
  }
]

},{}],5:[function(require,module,exports){

module.exports = [
  {
    header: [
      {
        offset: 4,
        type: 'string',
        match: 'ftypMSNV',
        description: 'MPEG-4 video file'
      }
    ],
    mime: 'video/mp4',
    extension: 'mp4'
  },
  {
    header: [
      {
        offset: 4,
        type: 'string',
        match: 'ftyp3gp5',
        description: 'MPEG-4 video file'
      }
    ],
    mime: 'video/mp4',
    extension: 'mp4'
  },
  {
    header: [
      {
        offset: 4,
        type: 'string',
        match: 'ftypisom',
        description: 'ISO Base Media file (MPEG-4) v1'
      }
    ],
    mime: 'video/mp4',
    extension: 'mp4'
  },
  {
    header: [
      {
        offset: 4,
        type: 'string',
        match: 'ftypmp42',
        description: 'MPEG-4 video QuickTime file'
      }
    ],
    mime: 'video/m4v',
    extension: 'm4v'
  },
  {
    header: [
      {
        offset: 4,
        type: 'string',
        match: 'ftypqt',
        description: 'QuickTime file'
      }
    ],
    mime: 'video/mov',
    extension: 'mov'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'RIFF',
        description: ' Windows Audio Video Interleave file'
      },
      {
        offset: 8,
        type: 'string',
        match: 'AVI LIST',
        description: ''
      }
    ],
    mime: 'video/avi',
    extension: 'avi'
  }
]

},{}]},{},[1])(1)
});