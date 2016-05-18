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
    // if (magic.extension === 'm4a') {
    //   debugger
    // }
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
const audio = require('../magic/audio')
const image = require('../magic/image')

module.exports = [].concat(flash).concat(document).concat(video)
  .concat(audio).concat(image)

},{"../magic/audio":3,"../magic/document":4,"../magic/flash":5,"../magic/image":6,"../magic/video":7}],3:[function(require,module,exports){

module.exports = [
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'ID3',
        description: 'MPEG-1 Audio Layer 3 (MP3) audio file'
      }
    ],
    mime: 'audio/x-mpeg-3',
    extension: 'mp3'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'RIFF',
        description: 'Audio for Windows file'
      },
      {
        offset: 8,
        type: 'string',
        match: 'WAVEfmt',
        description: ''
      }
    ],
    mime: 'audio/wav',
    extension: 'wav'
  },
  {
    header: [
      {
        offset: 4,
        type: 'bytes',
        match: [0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41, 0x20],
        description: 'Apple Lossless Audio Codec file'
      }
    ],
    mime: 'audio/m4a',
    extension: 'm4a'
  },
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0x00, 0x00, 0x00, 0x20],
        description: 'Apple Lossless Audio Codec file'
      },
      {
        offset: 4,
        type: 'string',
        match: 'ftypM4A ',
        description: ''
      }
    ],
    mime: 'audio/m4a',
    extension: 'm4a'
  }
]

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){

module.exports = [
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
        description: 'Portable Network Graphics file'
      }
    ],
    mime: 'image/png',
    extension: 'png'
  },
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0xFF, 0xD8, 0xFF, 0xE0],
        description: 'JPEG/JFIF graphics file'
      },
      {
        offset: 6,
        type: 'bytes',
        match: [0x4A, 0x46, 0x49, 0x46, 0x00]
      }
    ],
    mime: 'image/jpeg',
    extension: 'jpg'
  },
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0xFF, 0xD8, 0xFF, 0xE1],
        description: 'Digital camera JPG using Exchangeable Image File Format (EXIF)'
      },
      {
        offset: 6,
        type: 'bytes',
        match: [0x45, 0x78, 0x69, 0x66, 0x00]
      }
    ],
    mime: 'image/jpeg',
    extension: 'jpg'
  },
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0xFF, 0xD8, 0xFF, 0xE8],
        description: 'Still Picture Interchange File Format (SPIFF)'
      },
      {
        offset: 6,
        type: 'bytes',
        match: [0x53, 0x50, 0x49, 0x46, 0x46, 0x00]
      }
    ],
    mime: 'image/jpeg',
    extension: 'jpg'
  },
  {
    header: [
      {
        offset: 0,
        type: 'bytes',
        match: [0x49, 0x20, 0x49],
        description: 'Tagged Image File Format file'
      }
    ],
    mime: 'image/tiff',
    extension: 'tif'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'GIF87a',
        description: 'Graphics interchange format file'
      }
    ],
    mime: 'image/gif',
    extension: 'gif'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'GIF89a',
        description: 'Graphics interchange format file'
      }
    ],
    mime: 'image/gif',
    extension: 'gif'
  },
  {
    header: [
      {
        offset: 0,
        type: 'string',
        match: 'RIFF',
        description: 'Google WebP image file'
      },
      {
        offset: 8,
        type: 'string',
        match: 'WEBP',
        description: ''
      }
    ],
    mime: 'image/webp',
    extension: 'webp'
  }
]

},{}],7:[function(require,module,exports){

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