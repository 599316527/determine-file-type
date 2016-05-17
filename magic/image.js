
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
