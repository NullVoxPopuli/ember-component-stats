'use strict';

module.exports = {
  presets: [
    require('@babel/preset-typescript'),
    [require('babel-preset-latest-node'), { target: 'current' }],
  ],
};
