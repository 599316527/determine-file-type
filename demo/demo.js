var $file = document.getElementById('file')
var $result = document.getElementById('result')
var $loading = document.getElementById('loading')

var reader = new FileReader()
reader.addEventListener('load', function (evt) {
  var determined = determineFileType((new Int8Array(evt.target.result)).slice(0, 128))
  $result.innerHTML = determined
    ? `<span class="mime">${determined.mime}</span>`
    : '<span class="err">Unknown file type</span>'
  $loading.style.display = ''
})

$file.addEventListener('change', function(evt){
  $result.innerHTML = ''
  let file = evt.target.files[0]
  if (!file) {
    return
  }
  $loading.style.display = 'inline'
  reader.readAsArrayBuffer(file)
})
