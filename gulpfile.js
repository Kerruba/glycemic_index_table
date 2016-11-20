// var replace = require('rollup-plugin-replace');
var elixir = require('laravel-elixir');
elixir.config.assetsPath = "src/";
elixir.config.publicPath = "client/assets/";

elixir(function(mix) {
    mix.webpack('app.js');
});
