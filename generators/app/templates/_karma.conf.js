module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['mocha', 'chai'],
        files: [
            'test.webpack.js',
        ],
        webpack: {
            module: {
                rules: [
                // instrument only testing sources with Istanbul
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015'],
                            },
                        },
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.js$|\.jsx$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true },
                        },
                        enforce: 'pre',
                        exclude: /node_modules/,
                    },
                ],
            },
        },
        preprocessors: {
            // add webpack as preprocessor
            'test.webpack.js': ['webpack'],
        },
        exclude: [
            '**/*.swp',
        ],

        coverageIstanbulReporter: {
            dir: 'coverage/',
            thresholds: {
                emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
                global: { // thresholds for all files
                    statements: 80,
                    lines: 80,
                    branches: 80,
                    functions: 80,
                },
                each: { // thresholds per file
                    statements: 80,
                    lines: 80,
                    branches: 80,
                    functions: 80,
                    overrides: {
                        'baz/component/**/*.js': {
                            statements: 80,
                        },
                    },
                },
            },
            reports: ['html', 'lcov', 'text-summary'],
            fixWebpackSourcePaths: true,
            reporters: [
        { type: 'text' },
        { type: 'html', subdir: 'report-html', file: 'report.html' },
        { type: 'lcov', subdir: 'report-lcov', file: 'report.txt' },
            ],
        },

    reporters: ['progress', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
  });
};
