
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
