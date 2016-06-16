/**
 * Created by gaston on 14/06/16.
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(/*options parameter*/);

var paths = {
    bower:{
        materialize:'./bower_components/Materialize',
        jquery:'./bower_components/jquery'
    },
    destSass:'./src/scss',
    destJs:'./src/js',
    destFonts:'./src/fonts'
};

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




gulp.task('default', function() {
    // place code for your default task here
});