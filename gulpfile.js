var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  Promise = require('bluebird'),
  gutil = require('gulp-util'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  _ = require('underscore'),
  source = require('vinyl-source-stream'),
  envify = require('envify/custom'),
  reactify = require('reactify'),
  sourcemaps = require('gulp-sourcemaps');

var development = 'development';
var envString = process.env.NODE_ENV || development;
var debug = envString === development;

var paths = {
  root: __dirname,
  styles: __dirname + '/styles',
  src: __dirname + '/scripts',
};

var w;

function rebundle() {
  return new Promise(function(resolve, reject) {
    w.transform(envify({
      NODE_ENV: envString
    }))
    .bundle()
    .on('error', function(event) {
      gutil.log('Browserify bundle error !');
      reject(event);
    })
    //.on('file', function(file, id, parent) {
    //  //This is to debug if you want a quick & dirty way
    //  //to see all files compiled into the bundle
    //  if (!debug) return;
    //  console.log(file);
    //})
    .pipe(source('main.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(paths.root))
    .on('finish', function() {
      resolve();
    })
    .pipe(connect.reload());
  });
}

gulp.task('browserify', function() {
  var opts = _.defaults(watchify.args, {
    debug: debug,
    transform: [
      [
        "reactify", {
          "es6": true
        }
      ]
    ]
  });
  w = watchify(browserify(paths.src + '/main.js', opts));
  return rebundle();
});

gulp.task('less', function() {
  gulp.src(paths.styles + '/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(paths.root))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('build', ['less', 'browserify']);

gulp.task('watch', ['build', 'webserver'], function() {
  w.on('update', function() {
    console.log('Browserifying !');
    return rebundle();
  });

  gulp.watch(paths.styles + '/**/*.less', ['less']).on('change', function(file) {
    console.log(file.path + ' changed !');
  });
});

gulp.task('default', ['build', 'watch']);
