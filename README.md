# linguas-file
A library to handle LINGUAS files

This library helps you handle LINGUAS files (used in gettext based i18n workflows) as specified in https://www.gnu.org/software/gettext/manual/html_node/po_002fLINGUAS.html

## Installation

Install from npm:

```
npm i linguas-file
```

## API

The module exposes two functions:

### `parse(input)`

This method takes a string or a buffer representing the content of a LINGUAS file and returns an Array of strings, containing the language tokens.

#### Example

```js
const fs = require('fs')
const linguasFile = require('linguas-file')

/* content of ./LINGUAS:

# languages we support
fr pt
es de

*/

fs.readFile('./LINGUAS', 'utf-8', function (err, data) {
  const tokens = linguasFile.parse(data) // => ['fr', 'pt', 'es', 'de']
})
```

### `serialize(tokens, [comment])`

This method takes an Array of tokens and an optional comment and returns a valid LINGUAS file.

#### Example

```js
const fs = require('fs')
const linguasFile = require('linguas-file')

const languages = ['pt', 'fr', 'es', 'de']

const file = linguasFile.serialize(
  languages, 'we are planning to support more of these'
)

fs.writeFileSync('./LINGUAS', file)

/* Content of ./LINGUAS after write:

# we are planning to support more of these
pt fr es de

*/
```

## License

Copyright 2021 Frederik Ring - Available under the Mozilla Public License 2.0
