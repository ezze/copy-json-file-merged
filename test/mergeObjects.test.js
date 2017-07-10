import chai from 'chai';
chai.should();

import mergeObjects from '../src/mergeObjects';

describe('merge objects', () => {
    const srcObj = {
        merge: 'object',
        obj: {
            id: 1,
            nested: true
        },
        key: 2
    };

    const destObj = {
        merge: 'dest',
        obj: {
            id: 1,
            nested: false,
            newField: 'dest'
        }
    };

    const srcArr = [{
        id: 1,
        nested: false
    }, {
        id: 2,
        merge: 'array'
    }];

    it('empty destination object', () => {
        mergeObjects(srcObj, {}).should.be.deep.equal(srcObj);
    });

    it('empty destination array', () => {
        mergeObjects(srcArr, []).should.be.deep.equal(srcArr);
    });

    it('non-empty destination object', () => {
        mergeObjects(srcObj, destObj).should.be.deep.equal({
            merge: 'dest',
            obj: {
                id: 1,
                nested: false,
                newField: 'dest'
            },
            key: 2
        });
    });

    it('overwrite non-empty destination object', () => {
        mergeObjects(srcObj, destObj, {
            overwrite: true
        }).should.be.deep.equal({
            merge: 'object',
            obj: {
                id: 1,
                nested: true,
                newField: 'dest'
            },
            key: 2
        });
    });

    it('overwrite only specified section of non-empty destination object', () => {
        mergeObjects(srcObj, destObj, {
            overwrite: ['obj']
        }).should.be.deep.equal({
            merge: 'dest',
            obj: {
                id: 1,
                nested: true,
                newField: 'dest'
            },
            key: 2
        });
    });
});
