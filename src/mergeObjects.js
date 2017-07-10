import merge from 'merge-professor';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';

export default function mergeObjects(src, dest, options) {
    options = options || {};
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

        const destSection = dest[section] ? dest[section] : defaultSection(src[section], dest[section]) ;
        const srcSection = src[section] ? src[section] : defaultSection(dest[section], src[section]);

        if (!isObject(srcSection) || !isObject(destSection)) {
            json[section] = includes(overwriteSections, section) ? srcSection : destSection;
        }
        else if (includes(overwriteSections, section)) {
            json[section] = merge(destSection, srcSection, mergeKey);
        }
        else {
            json[section] = merge(srcSection, destSection, mergeKey);
        }
    }
    return json;
}

function defaultSection(item, defaultValue) {
    if (isArray(item)) {
        return [];
    }

    if (isObject(item)) {
        return {};
    }

    return item !== undefined ? item : defaultValue;
}
