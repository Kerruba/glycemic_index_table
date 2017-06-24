const parts   = require('./webpack.parts.js');
const merge   = require('webpack-merge');
const path    = require('path');
const srcRoot = './src/';
const distRoot = './client/assets/';

const ENTRIES = {
    entry: path.resolve(__dirname, srcRoot, 'js', 'app.js'),
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, distRoot)
    }
};

const LOADERS = merge(
    parts.babel({exclude: path.resolve(__dirname, 'node_modules')}),
    parts.vue(),
    parts.vuehtml(),
    parts.scss()
);

const PLUGINS = merge(
    parts.plugins.default()
);


const CONFIGURATION = merge(
    ENTRIES,
    LOADERS,
    PLUGINS
);

module.exports = CONFIGURATION;