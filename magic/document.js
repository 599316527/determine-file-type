
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
