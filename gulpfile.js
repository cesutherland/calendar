
// Modules:

var path              = require('path');
var gulp              = require('gulp');
var gulpWatch         = require('gulp-watch');
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

// gulp.task('default', ['webpack', 'webpack-server', 'less']);
gulp.task('default', ['server', 'less', 'watch']);

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

gulp.task('watch', function () {
  return gulp.watch('./src/**/*.less', ['watch-less']);
});
