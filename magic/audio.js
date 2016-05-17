
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
  }
]
