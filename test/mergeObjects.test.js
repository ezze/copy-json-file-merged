import chai from 'chai';
chai.should();

import mergeObjects from '../src/mergeObjects';

describe('merge objects', () => {
    const src = {
        merge: 'object',
        obj: {
            nested: true
        }
    };

    it('empty destination object', () => {
        mergeObjects(src, {}).should.be.deep.equal(src);
    });
});
