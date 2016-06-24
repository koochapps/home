/**
 * Created by gaston on 14/06/16.
 */

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(/*options parameter*/),
    browserSync = require('browser-sync'),
    bowerFiles = require('main-bower-files');

var paths = {
    base:'./src'
};


gulp.task('serve', ['inject'], function() {

    browserSync.init({
        server: paths.base
    });

    gulp.watch(paths.base + "/scss/**/*.scss", ['sass']);
    gulp.watch(paths.base + "/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(paths.base + "/scss/**/*.scss")
        .pipe($.sass())
        .pipe($.rename('koochapps.css'))
        .pipe(gulp.dest(paths.base + "/css/"));
});


gulp.task('inject',['sass'], function () {
    var target = gulp.src(paths.base + '/index.html');

    var sources = gulp.src([paths.base + '/js/**/*.js', paths.base + '/css/**/*.css'], {read: false});
    var bFiles = gulp.src(bowerFiles()).pipe(gulp.dest(paths.base + '/lib'));

    return target.pipe($.inject(sources,{relative:true}))
        .pipe($.inject(bFiles, {name: 'bower',relative:true}))
        .pipe(gulp.dest(paths.base))
        .pipe(browserSync.stream());
});


/**
 * task for move fonts to project
 */
gulp.task('materialize-fonts',function(){
    gulp.src('./bower_components/Materialize/fonts/**')
        .pipe(gulp.dest(paths.base + '/fonts'));
});


/*
gulp.task('materialize',['materialize-sass','materialize-js','materialize-fonts']);


gulp.task('materialize-sass',function(){
    gulp.src(paths.bower.materialize + '/sass/**')
    .pipe(gulp.dest(paths.destSass + '/bower_sass'));
});

gulp.task('materialize-js',function(){
    gulp.src(paths.bower.materialize + '/dist/js/materialize.js')
        .pipe(gulp.dest(paths.destJs));
});

gulp.task('materialize-fonts',function(){
    gulp.src(paths.bower.materialize + '/dist/fonts/**')
        .pipe(gulp.dest(paths.destFonts));
});

*/


gulp.task('default', function() {
    // place code for your default task here
});