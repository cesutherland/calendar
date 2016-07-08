// Modules:
var path              = require('path');
var gulp              = require('gulp');
var webpackRecipe     = require('gib-recipe-webpack');


// Tasks:

gulp.task('default', ['webpack', 'webpack-server']);


gulp.task('webpack', function () {
  return gulp.src('src/index.js')
    .pipe(webpackRecipe.webpack({
      dest: path.resolve(__dirname, 'build')
    }))
    .on('error', console.error)
    .pipe(gulp.dest('build/'));
});


gulp.task('webpack-server', webpackRecipe.server({
  dest: path.resolve(__dirname, 'build'),
}));
