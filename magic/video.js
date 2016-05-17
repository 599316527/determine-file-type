
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
