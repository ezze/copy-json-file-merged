import merge from 'merge-professor';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';

export default function mergeObjects(src, dest, options) {
    const mergeKey = options.mergeKey || 'id';
    const overwrite = options.overwrite || false;

    if (!overwrite) {
        return merge(src, dest, mergeKey);
    }

    if (isArray(dest)) {
        return merge(dest, src, mergeKey);
    }

    const sections = uniq(keys(src).concat(keys(dest)));
    const overwriteSections = isArray(overwrite) ? intersection(keys(src), overwrite): keys(src);

    const json = {};
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const destSection = dest[section] ? dest[section] : isArray(src[section]) ? [] : {};
        const srcSection = src[section] ? src[section] : isArray(dest[section]) ? [] : {};
        if (includes(overwriteSections, section)) {
            json[section] = merge(destSection, srcSection, mergeKey);
        }
        else {
            json[section] = merge(srcSection, destSection, mergeKey);
        }
    }
    return json;
}
