var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var usemin        = require('gulp-usemin');
var uglify        = require('gulp-uglify');
var minifyHtml    = require('gulp-minify-html');
var minifyCss     = require('gulp-minify-css');
var rev           = require('gulp-rev');
var karma         = require('gulp-karma');
var testFiles     = [
    'tests/bootstrap.js',
    'app/scripts/**/*.js',
    'tests/spec/**/*.js'
];

gulp.task('lint', function () {
    return gulp
        .src('./app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
    ;
});

gulp.task('usemin', function () {
    return gulp
        .src('app/*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [uglify()]
        }))
        .pipe(gulp.dest('build/'))
    ;
});

gulp.task('test', function () {
    return gulp
        .src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
    ;
});

gulp.task('watch', function () {
    gulp.watch('app/scripts/**/*.js', ['lint']);
    gulp.watch('tests/spec/**/*.js', ['test']);
});

gulp.task('build', ['usemin']);
