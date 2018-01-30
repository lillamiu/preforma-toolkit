'use strict';

const gulp = require('gulp');
const fractal = require('./fractal.js');
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

var config = {
    src: {
        folder: './src',
        scripts: {
            toolkit: './src/components/**/*.js',
            entryPoint: './src/components/all-scripts.js',
            vendor: './node_modules'
        },
        styles: {
            allStyles: './src/**/*.scss',
            toolkit: './src/_global-styles/main.scss',
            vendor: './node_modules'
        },
        docs: './src/docs',
        images: './public/images/**/*',
        fonts: './public/fonts/**/*'
    },
    dest: {
        folder: './public',
        styles: {
            toolkit: './public/css'
        },
        scripts: {
            toolkit: './src/reda-scripts-bundle.js',
            build: './public/js/evry-campaign-scripts-bundle.js',
            public: './public/js'
        },
        images: './public/images',
        fonts: './public/fonts'
    }
};

gulp.task('styles', function(){
    gulp.src(config.src.styles.toolkit)
    .pipe(sass({
        includePaths: [config.src.styles.vendor]
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.dest.styles.toolkit))
});

/*gulp.task('styles', function(){
    gulp.src(config.src.styles.allStyles)
    .pipe(sass({
        includePaths: [config.src.styles.vendor]
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.dest.styles.toolkit))
}); */

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

gulp.task('default', function() {
  // define build tasks
    var tasks = [
        'styles',

        'fractal:start',
        'fractal:build'
    ];

    // run build
    runSequence(tasks, function () {
        // if (config.dev) {
        //     gulp.start('serve');
        // }
    });
});
