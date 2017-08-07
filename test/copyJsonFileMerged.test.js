import path from 'path';
import fs from 'fs';

import chai from 'chai';
chai.should();

import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import copyJsonFileMerged from '../src/copyJsonFileMerged';

describe('copy json file merged', () => {
    const outPath = path.resolve(__dirname, 'out');

    beforeEach(done => {
        rimraf(outPath, () => {
            mkdirp(outPath, done);
        });
    });

    after(done => {
        rimraf(outPath, done);
    });

    it('source file doesn\'t exist', () => {
        const srcPath = path.resolve(__dirname, 'fixtures/some-src.json');
        const destPath = path.resolve(outPath, 'dest.json');
        copyJsonFileMerged(srcPath, destPath).should.to.be.false;
    });

    it('source file is invalid json', () => {
        const srcPath = path.resolve(outPath, 'src.json');
        const destPath = path.resolve(outPath, 'dest.json');
        fs.writeFileSync(srcPath, 'invalid json');
        copyJsonFileMerged(srcPath, destPath).should.to.be.false;
    });

    it('destination file is invalid json', () => {
        const srcPath = path.resolve(__dirname, 'fixtures/src.json');
        const destPath = path.resolve(outPath, 'dest.json');
        fs.writeFileSync(destPath, 'invalid json');
        copyJsonFileMerged(srcPath, destPath).should.to.be.false;
    });

    it('destination file is in non-existing directory', () => {
        const srcPath = path.resolve(__dirname, 'fixtures/src.json');
        const destPath = path.resolve(outPath, 'dest/dest.json');
        copyJsonFileMerged(srcPath, destPath).should.to.be.true;
    });
});
