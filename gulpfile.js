// Modules:
var gulp              = require('gulp');
var gulpBabel         = require('gulp-babel');
var gulpWebpack       = require('webpack-stream');
var webpack           = require('webpack');
var WebpackServer     = require('webpack-dev-server');
var config            = require('./webpack-config');


// Tasks:
gulp.task('default', ['webpack', 'webpack-server']);


gulp.task('webpack-server', function () {
  new WebpackServer(webpack(config)).listen(8080, 'localhost', function (err) {
    console.error('no server started');
  });
});


gulp.task('webpack', function () {
  return gulp.src('src/index.js')
    .pipe(gulpBabel({presets: ['es2015']}))
    .pipe(gulpWebpack(config))
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('build/'))
});
