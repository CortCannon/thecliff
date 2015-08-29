var config = require("./gulp.config")();
var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


gulp.task('publish', function () {
    var conn = ftp.create({
        host: 'thecliff.info',
        user: config.user,
        password: config.password,
        parallel: 10,
        log: gutil.log
    });

    // using base = '.' will transfer everything  correctly 
    // turn off buffering in gulp.src for best performance 
    return gulp.src('thecliff.info/**', { base: '.', buffer: false })
        .pipe(conn.newer('/')) // only upload newer files 
        .pipe(conn.dest('/'));
});

gulp.task('css-sync', function () {
    return gulp.src("thecliff.info/**/*.css")
        .pipe(browserSync.stream());
});
    

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./thecliff.info/"
        }
    });

    gulp.watch("thecliff.info/**/*.css", ['css-sync']);
    gulp.watch("thecliff.info/**/*.html").on("change", browserSync.reload);
});

