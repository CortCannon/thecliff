var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var config = require("./gulp.config")();


gulp.task('build', function () {

    var conn = ftp.create({
        host: 'thecliff.info',
        user: config.user,
        password: config.password,
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'thecliff.info/**'
    ];
 
    // using base = '.' will transfer everything  correctly 
    // turn off buffering in gulp.src for best performance 
    return gulp.src(globs, { base: '.', buffer: false })
        .pipe(conn.newer('/')) // only upload newer files 
        .pipe(conn.dest('/'));
});
