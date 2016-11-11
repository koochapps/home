/**
 * Created by gaston on 14/06/16.
 */

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(/*options parameter*/),
    browserSync = require('browser-sync'),
    del = require('del'),
    bowerFiles = require('main-bower-files' ),
    nMock = require('n-mock' ),
    config = require('./koochapps.json' );

var gSync = $.sync(gulp);
var env = null;

var paths = {
    src:'./src',
    build:'./build',
    dist:'./dist',
    publish:'./'
};

/**
 * Server
 */
gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: paths.build,
        middleware: [ nMock(__dirname + '/mocks') ]
    });

    gulp.watch(paths.src + "/scss/**/*.scss", ['build:sass',browserSync.reload]);
    gulp.watch(paths.src + "/img/**/*", ['build:images',browserSync.reload]);
    gulp.watch(paths.src + "/*.html", [gSync.sync(['build:html','build:inject']),browserSync.reload]);
    gulp.watch(paths.src + "/js/**/*.js",['build:js', browserSync.reload]);
});


/**
 * Build
*/
gulp.task('build', gSync.sync(['clean:build','build:inject','build:fonts','build:otherFiles']));

gulp.task('build:sass', function() {
    return gulp.src(paths.src + "/scss/**/*.scss")
        .pipe($.sass())
        //.pipe($.debug({title:'sass'}))
        .pipe($.rename('koochapps.css'))
        .pipe(gulp.dest(paths.build + "/css/"));
});

gulp.task('build:js',function(){
    env = config.dev;
    return gulp.src(paths.src + "/js/**/*.js")
        .pipe( $.insert.prepend('var env = ' + JSON.stringify(env) + ';') )
        .pipe(gulp.dest(paths.build + "/js"));
});


gulp.task('build:images',function(){
   return gulp.src(paths.src + "/img/**/*")
       .pipe(gulp.dest(paths.build + "/img"));
});

gulp.task('build:fonts',function(){
    return gulp.src(['./bower_components/Materialize/fonts/**','./bower_components/font-awesome/fonts/**'])
        .pipe(gulp.dest(paths.build + '/fonts'));
});

gulp.task('build:html',function(){
    return gulp.src(paths.src + '/index.html')
        .pipe(gulp.dest(paths.build))
        .pipe(gulp.src(paths.build + '/index.html'));
});

gulp.task('build:inject',gSync.sync([['build:html','build:sass','build:images'],'build:js']), function () {
    var target = gulp.src(paths.build + '/index.html');

    var sources = gulp.src([paths.build + '/js/**/*.js', paths.build + '/css/**/*.css'], {read: false});
    var bFiles = gulp.src(bowerFiles()).pipe(gulp.dest(paths.build + '/lib'));

    return target.pipe($.inject(sources,{relative:true}))
        .pipe($.inject(bFiles, {name: 'bower',relative:true}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('build:otherFiles', function(){
   return gulp.src(paths.src + '/cv-koochapps.pdf')
       .pipe(gulp.dest(paths.build));
});

/**
 * Minify
 * */

gulp.task('minify',gSync.sync(['clean:dist',['minify:js','minify:css','minify:img','minify:fonts'],'minify:html','clean:build']));

gulp.task('move:img',function(){
    return gulp.src(paths.src + '/img/logo-set.svg')
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('minify:img',['move:img'],function(){
    return gulp.src([paths.src + '/img/**','!' + paths.src + '/img/logo-set.svg'])
        .pipe($.imagemin())
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('minify:js',function(){
    env = config.prod;
    return gulp.src(bowerFiles())
        .pipe($.addSrc.append(paths.src + '/js/**/*.js'))
        .pipe( $.insert.prepend('var env = ' + JSON.stringify(env) + ';') )
        .pipe($.concat('koochapps.js'))
        .pipe($.minify())
        .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('minify:css',['build:sass'],function(){
    return gulp.src(paths.build + '/css/**/*.css')
        .pipe($.cleanCss())
        .pipe($.rename('koochapps-min.css'))
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('minify:fonts',function(){
    return gulp.src(['./bower_components/Materialize/fonts/**','./bower_components/font-awesome/fonts/**'])//TODO add minify
        .pipe(gulp.dest(paths.dist + '/fonts'));
});


gulp.task('minify:html',['minify:js','minify:css'],function(){
    var ignore = paths.dist.replace('.','');
    return gulp.src(paths.src + '/index.html')
        .pipe($.inject(gulp.src(paths.dist + '/**/*-min.*', {read: false}),{ignorePath:ignore}))
        .pipe($.htmlmin({collapseWhitespace: true,removeComments:true}))
        .pipe(gulp.dest(paths.dist));
});

/**
 * Publish
 */
gulp.task('publish',['minify','SEO','otherFiles'],function(){
    return gulp.src(paths.dist + '/**/*')
        .pipe(gulp.dest(paths.publish));
});

gulp.task('otherFiles',function(){
    return gulp.src(paths.src + '/cv-koochapps.pdf')
        .pipe(gulp.dest(paths.publish));
});

gulp.task('SEO', function(){
    return gulp.src([paths.src + '/robots.txt',paths.src + '/sitemap.xml'])
        .pipe(gulp.dest(paths.publish));
});

/**
 * Clean
 */
gulp.task('clean',['clean:dist','clean:build']);

gulp.task('clean:dist',function(){
    del(paths.dist);
});

gulp.task('clean:build',function(){
    del(paths.build);
});

gulp.task('default', function() {
    // place code for your default task here
});