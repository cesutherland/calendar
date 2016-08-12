'use strict';

// Modules:
var gib              = require('gib');
var gulp             = require('gulp');


// Config: 
var config = {
  server: {
    root: './'
  },
  less: {
    src: './src/index.less',
    dest: './build/styles-bundle.css'
  },
  browserify: {
    src: './src/index.js',
    dest: './build/app-bundle.js'
  }
};

gib(gulp, config);
