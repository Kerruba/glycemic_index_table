const parts   = require('./webpack.parts.js');
const merge   = require('webpack-merge');
const path    = require('path');
const srcRoot = './src/';
const distRoot = './client/assets/';

const ENTRIES = {
    entry: {
        'js/app.js': path.resolve(__dirname, srcRoot, 'js', 'app.js'),
    },
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

// Working just in development at the moment
const PLUGINS = merge(
    parts.plugins.default(),
    parts.plugins.development({
        browserSync: {
            proxy: 'localhost:3000'
        }
    })
);

const RESOLVE = merge({
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
});

const CONFIGURATION = merge(
    ENTRIES,
    LOADERS,
    PLUGINS,
    RESOLVE
);


module.exports = CONFIGURATION;