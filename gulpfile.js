
// Modules:

var path              = require('path');
var gulp              = require('gulp');
var lessRecipe        = require('gib-recipe-less');
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

gulp.task('default', ['webpack', 'webpack-server', 'less']);

gulp.task('webpack', function () {
  return gulp.src('src/index.js')
    .pipe(webpackRecipe.webpack(options))
    .on('error', console.error)
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack-server', webpackRecipe.server(options));

gulp.task('less', lessRecipe.lessTask({
  src: './node_modules/bootstrap/less/bootstrap.less',
  dest: './build/styles-bundle.css'
}));
