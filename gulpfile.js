const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

// const autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function() {
    return del.sync('dist')
});
gulp.task('sass', function() {
    return gulp.src('app/css/sass/**/*.scss', { sourcemap: true,})
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src('app/js/main/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('img', function() {
    return gulp.src('app/media/img/**/*')
        .pipe(gulp.dest('dist/media/img'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('video', function() {
    return gulp.src('app/media/video/**/*')
        .pipe(gulp.dest('dist/media/video'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('svg', function() {
    return gulp.src('app/media/svg/**/*')
        .pipe(gulp.dest('dist/media/svg'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: true
    })
});
gulp.task('watch', function() {
    gulp.watch('app/css/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/index.html'), gulp.parallel('html')
    gulp.watch(['app/js/main/main.js']), gulp.parallel('scripts')
    gulp.watch('app/img/**/*'), gulp.parallel('img')
    gulp.watch('app/video/**/*'), gulp.parallel('video')
    gulp.watch('app/fonts/**/*'), gulp.parallel('fonts')
    gulp.watch('app/svg/**/*'), gulp.parallel('svg')
    // gulp.task('default', gulp.parallel('sass','html', 'scripts', 'browser-sync','img', 'watch'))
})

gulp.task('build', gulp.parallel('clean', 'sass', 'video', 'svg', 'fonts', 'scripts', 'html', 'img', 'browser-sync','watch'))