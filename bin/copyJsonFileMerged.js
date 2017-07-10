#!/usr/bin/env node

import path from 'path';
import minimist from 'minimist';

import copyJsonFileMerged from '../lib/copyJsonFileMerged';

const argv = minimist(process.argv.slice(2));
const src = path.resolve(argv.src);
const dest = path.resolve(argv.dest);
const overwrite = argv.overwrite;
const mergeKey = argv['merge-key'];

if (!copyJsonFileMerged(src, dest, {
    overwrite,
    mergeKey
})) {
    console.error(`Unable to copy ${src} JSON file to ${dest}.`);
    process.exit(1);
}
