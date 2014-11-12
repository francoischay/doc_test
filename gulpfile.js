var gulp      = require('gulp'),
  connect     = require('gulp-connect'),
  less        = require('gulp-less'),
    Promise = require('bluebird'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    _ = require('underscore'),
    source = require('vinyl-source-stream'),
    envify = require('envify/custom'),
    reactify = require('reactify');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});
 
gulp.task('less', function() {
  gulp.src('styles/less/*')
    .pipe(less())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(connect.reload());
});

var envString = process.env.NODE_ENV || 'development';

var debug = false;

var paths = {
    root: __dirname,
    styles: __dirname + '/styles',
    src: __dirname + '/scripts',
};

var w;

function rebundle() {
    return new Promise(function(resolve, reject) {
        w.transform(envify({NODE_ENV: envString}))
        .bundle()
        .on('error', function(event) {
            gutil.log('Browserify bundle error !');
            reject(event);
        })
        .on('file', function(file, id, parent) {
            if (!debug) return;
            console.log(file);
        })
        .pipe(source('main.js'))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(paths.root))
        .on('finish', function() {
            resolve();
            connect.reload();
        });
    });
}

gulp.task('browserify', function() {
    var opts = _.defaults(watchify.args, {
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

gulp.task('build', ['less', 'browserify']);

gulp.task('watch', ['build', 'webserver'], function() {
    w.on('update', function() {
        console.log('Browserifying !');
        return rebundle();
    });

    gulp.watch('styles/**/*.less', ['less']).on('change', function(file) {
        console.log(file.path + ' changed !');
    });
});

gulp.task('default', ['build', 'watch']);