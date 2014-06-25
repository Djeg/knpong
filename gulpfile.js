var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var usemin        = require('gulp-usemin');
var uglify        = require('gulp-uglify');
var minifyHtml    = require('gulp-minify-html');
var minifyCss     = require('gulp-minify-css');
var rev           = require('gulp-rev');
var karma         = require('karma').server;

var testFiles     = [
    {pattern: 'app/main.html', watched: false},
    {pattern: 'app/scripts/**/*.js', watched: false, included: false, served: true},
    'tests/bootstrap.js',
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

gulp.task('test', function (done) {
    karma.start({
        preprocessors: {
            '**/*.html': ['html2js']
        },
        proxies: {
            '/scripts/': 'http://localhost:9876/base/app/scripts/'
        },
        frameworks: ['jasmine'],
        basePath: '',
        files: testFiles,
        reporters: ['mocha'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 5000,
        singleRun: true
    }, done);
});

gulp.task('watch', function () {
    gulp.watch('app/scripts/**/*.js', ['lint']);
    gulp.watch('tests/spec/**/*.js', ['test']);
});

gulp.task('build', ['usemin']);
