

/* eslint-disable */
const parserOpts = require('./parser-opts');
const writerOpts = require('./writer-opts');

module.exports = Q.all([parserOpts, writerOpts])
  .spread((parserOpts, writerOpts) => ({ parserOpts, writerOpts }));
