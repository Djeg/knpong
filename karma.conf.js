module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        basePath: '',
        files: [],
        reporters: ['dots'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 5000,
        singleRun: true
    });
};
