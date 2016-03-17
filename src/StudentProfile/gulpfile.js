/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var envify = require('envify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('styles', function () {
    return gulp.src('wwwroot/css/screen.styl')
        .pipe(stylus({
            errors: true
        }))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('wwwroot/assets'));
});

gulp.task('app-js', function () {
    return browserify('wwwroot/js/app.js', {debug: true})
        .transform(reactify)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
            .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('wwwroot/assets'));
});

gulp.task('default', [
    'styles',
    'app-js'
]);
