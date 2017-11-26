# copy-json-file-merged

[![Greenkeeper badge](https://badges.greenkeeper.io/ezze/copy-json-file-merged.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/copy-json-file-merged.svg)](https://badge.fury.io/js/copy-json-file-merged)
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
copyJsonFileMerged('src.json', 'dest.json', {
    overwrite: true,
    mergeKey: 'id'
});
```

From CLI:

```bash
./node_modules/.bin/copy-json-file-merged src.json dest.json --overwrite --mergeKey id
```

From package.json's [scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "copy": "copy-json-file-merged src.json dest.json --overwrite --mergeKey id"
  }
}
```

## API

`copyJsonFileMerged` function accepts three arguments:

- `src` — path to source JSON file (must exist);
- `dest` — path to destination JSON file (can exist);
- `options` — object of properties (optional):
    - `mergeKey` — a key (property) to merge nested objects and arrays by (see
    [merge arrays uniting their object items by specified identifier field](https://github.com/ezze/merge-professor#examples)),
    by default is `id`;
    - `overwrite` — shows whether source object should overwrite destination one (if it exists),
    by default is `false`; alternatively, an array of top-level properties' names of source JSON object can be passed
    to limit sections of destination JSON file to overwrite, e.g.:
    
        **src.json**
        ```json
        {
          "obj1": { "merged": true },
          "obj2": { "merged": true }
        }
        ```
        
        **dest.json**
        ```json
        {
          "obj1": { "merged": false },
          "obj2": { "merged": false }
        }
        ```
    
        ```javascript
        copyJsonFileMerged('src.json', 'dest.json', {
            overwrite: ['obj1']
        }); // => { "obj1": { "merged": true }, "obj2": { "merged": false } }
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
