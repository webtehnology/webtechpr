const filter = require('through2-filter').obj;
const fileSuffix = require('file-suffix');

module.exports = function oneOf() {
    const args = Array.prototype.slice.apply(arguments);
    const collected = {};

    return filter(file => {
        const tech = fileSuffix(file.path);

        if (args.length && args.indexOf(tech) < 0) {
            return true;
        }

        const stem = file.path.slice(0, - tech.length - 1);

        if (!collected[stem]) {
            collected[stem] = true;
            return true;
        }

        return false;
    });
};
