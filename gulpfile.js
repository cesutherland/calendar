
// Modules:

var path              = require('path');
var gulp              = require('gulp');
var gulpWatch         = require('gulp-watch');
var browserifyRecipe  = require('gib-recipe-browserify');
var lessRecipe        = require('gib-recipe-less');
var serverRecipe      = require('gib-recipe-server');
var webpackRecipe     = require('gib-recipe-webpack');

// Config: 

var options = {
  entry: {
    app: './src/index.js',
    //styles: '!style!css!less!bootstrap/less/bootstrap.less'
  },
  dest: path.resolve(__dirname, 'build'),
  loaders: [
    { test: /\.less$/, loader: 'style!css!less' },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' }
  ]
};


// Tasks:

gulp.task('default', ['less', 'js', 'server', 'watch']);

gulp.task('webpack', function () {
  return gulp.src('src/index.js')
    .pipe(webpackRecipe.webpack(options))
    .on('error', console.error)
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack-server', webpackRecipe.server(options));

gulp.task('less', lessRecipe.lessTask({
  src: './src/index.less',
  dest: './build/styles-bundle.css'
}));

gulp.task('server', serverRecipe.serverTask({
  root: './'
}));

gulp.task('watch-less', ['less'], serverRecipe.browserSync.reload);
// gulp.task('watch-js', ['js'], serverRecipe.browserSync.reload);

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['watch-less']);
  //gulp.watch('./src/**/*.js', ['watch-js']);
});

gulp.task('js', browserifyRecipe.jsTask({
  dest: './build/app-bundle.js',
  browserSync: serverRecipe.browserSync
}));
