Determine File Type
=====================

[DEMO](https://rawgit.com/599316527/determine-file-type/master/demo/index.html)

Hereby we check file structure header to determine file type.
It's more reliable than the way which maps mime type by extension name.

Inspired by [magic file](https://raw.githubusercontent.com/threatstack/libmagic/master/magic/Magdir/flash). File signatures is from [garykessler](http://www.garykessler.net/library/file_sigs.html)

#### Usage

```sh
$ bin/index.js --file path/to/the/file
```

```js
import determine from './lib/determine'
let {mime} = determine([0x78, 0x01, 0x73, 0x0D, 0x62, 0x62, 0x60, ...])
```

Specific usage:
[Node](/bin/index.js#L19-28)
[Web](/demo/demo.js#L6-7)

##### TODO
* [ ] Fill up magic data
* [ ] Unit tests
