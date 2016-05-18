
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
