const flash = require('../magic/flash')
const document = require('../magic/document')
const video = require('../magic/video')
const audio = require('../magic/audio')
const image = require('../magic/image')

module.exports = [].concat(flash).concat(document).concat(video)
  .concat(audio).concat(image)
