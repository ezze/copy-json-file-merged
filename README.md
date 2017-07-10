# copy-json-file-merged

[![Build Status](https://travis-ci.org/ezze/copy-json-file-merged.svg?branch=master)](https://travis-ci.org/ezze/copy-json-file-merged)
[![Coverage Status](https://coveralls.io/repos/github/ezze/copy-json-file-merged/badge.svg?branch=dev)](https://coveralls.io/github/ezze/copy-json-file-merged?branch=dev)

Copies source JSON file and merges its contents with destination JSON file if present.

## Installation

```bash
npm install copy-json-file-merged --save
```

## Usage

In code:

```javascript
var copyJsonFileMerged = require('copy-json-file-merged');
copyJsonFileMerged('src/file.json', 'dest/file.json', {
    overwrite: true,
    mergeKey: 'id'
});
```

From CLI:

```bash
./node_modules/.bin/copy-json-file-merged src/file.json dest/file.json --overwrite --mergeKey id
```

From package.json's [scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "copy": "copy-json-file-merged src/file.json dest/file.json --overwrite --mergeKey id"
  }
}
```

## Building

In order to build library run:

```bash
npm run build
```
    
## Testing
    
Run unit tests:

```bash
npm test
```
    
In order to run tests with [Coveralls](http://coveralls.io) locally you have to provide `COVERALLS_REPO_TOKEN`:
        
```bash
COVERALLS_REPO_TOKEN=<token> npm run test:coverage
```
    
## Contribution
    
Before making a pull request, please, be sure that your changes are rebased to `dev` branch.

## License

[MIT](LICENSE)
