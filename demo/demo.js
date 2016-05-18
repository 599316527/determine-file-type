
function getBoard(selector) {
  let $root = document.querySelector(selector)
  let $ext = $root.querySelector('.ext')
  let $mime = $root.querySelector('.mime')
  return {
    clear() {
      $root.style.display = 'none'
      $ext.innerHTML = $mime.innerHTML = ''
    },
    set({ext, mime}) {
      $ext.innerHTML = ext
      $mime.innerHTML = mime
      $root.style.display = ''
    }
  }
}

let byFilenameBoard = getBoard('.result .by-filename')
let byBinaryBoard = getBoard('.result .by-binary')
byFilenameBoard.clear()
byBinaryBoard.clear()

let loadingIcon = (function ($loading) {
  return {
    show() {
      $loading.style.display = 'inline'
    },
    hide() {
      $loading.style.display = ''
    }
  }
})(document.querySelector('.loading'))

let $binHeader = document.querySelector('.bin-header')

let reader = new FileReader()
reader.addEventListener('load', function (evt) {
  let headers = new Uint8Array(evt.target.result.slice(0, 32))
  $binHeader.innerHTML = Array.from(headers.slice(0, 16))
    .map(x => x.toString(16).toUpperCase())
    .map(x => x.length < 2 ? '0' + x : x).join(' ')
  let {mime, extension: ext} = determineFileType(headers) || {}
  byBinaryBoard.set({mime, ext})
  loadingIcon.hide()
})

let $file = document.querySelector('#file')
$file.addEventListener('change', function(evt){
  byFilenameBoard.clear()
  byBinaryBoard.clear()
  $binHeader.innerHTML = ''

  let file = evt.target.files[0]
  if (!file) {
    return
  }

  let ext = file.name.split('.').pop().toLowerCase()
  let mime = ext && MIME_TYPES[ext] ? MIME_TYPES[ext] : 'Unknown'
  byFilenameBoard.set({ext, mime})

  loadingIcon.show()
  reader.readAsArrayBuffer(file)
})
