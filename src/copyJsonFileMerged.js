import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import mkdirp from 'mkdirp';

import mergeObjects from './mergeObjects';

export default function copyJsonFileMerged(src, dest, options) {
    const srcPath = path.resolve(src);
    if (!fs.existsSync(srcPath) || !fs.statSync(srcPath).isFile()) {
        console.error('Source JSON file is not specified or doesn\'t exist.');
        return false;
    }

    let srcJson;
    try {
        srcJson = jsonfile.readFileSync(srcPath);
    }
    catch (e) {
        console.error('Unable to parse source JSON file.');
        console.error(e);
        return false;
    }

    const destPath = path.resolve(dest);
    let destJson;
    if (!fs.existsSync(destPath) || !fs.statSync(destPath).isFile()) {
        destJson = Array.isArray(srcJson) ? [] : {};
    }
    else {
        try {
            destJson = jsonfile.readFileSync(destPath);
        }
        catch (e) {
            console.error('Unable to parse destination JSON file.');
            console.error(e);
            return false;
        }
    }

    const json = mergeObjects(srcJson, destJson, options);

    const destDirPath = path.dirname(destPath);
    if (!fs.existsSync(destDirPath) || !fs.statSync(destDirPath).isDirectory()) {
        mkdirp.sync(destDirPath);
    }

    jsonfile.writeFileSync(destPath, json, {
        spaces: 2
    });
    return true;
}
