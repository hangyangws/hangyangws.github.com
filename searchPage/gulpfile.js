/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-07-07.
 */

var gulp = require('gulp'),
    clean = require('gulp-clean'), // 文件清理
    minifycss = require('gulp-clean-css'), // css 压缩
    uglify = require('gulp-uglify'), // js 压缩
    concat = require('gulp-concat'), // 文件合并
    browserSync = require('browser-sync').create(), // 浏览器刷新
    myPath = { // 路径参数
        clearPath: [
            'static/dist/css/*.css',
            'static/dist/js/*.js'
        ],
        concatFromCss: [
            'static/css/base.css',
            'static/css/animate-use.css',
            'static/css/index.css'
        ],
        concatFromJs: [
            'static/js/zepto.js',
            'static/js/index.js'
        ],
        concatToCss: 'static/css',
        concatToJs: 'static/js',
        minFromCss: 'static/css/*.css',
        minFromJs: 'static/js/*.js',
        minToCss: 'static/dist',
        minToJs: 'static/dist',
        reloadFile: [
            'index.html',
            'static/dist/*.css',
            'static/dist/*.js'
        ]
    };

// 执行压缩前，先删除文件夹里的内容
gulp.task('clean', function() {
    return gulp.src(myPath.clearPath, { read: false }).pipe(clean());
});

// CSS 合并
gulp.task('concatCss', function() {
    return gulp.src(myPath.concatFromCss)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(myPath.concatToCss));
});

// JavaScript 合并
gulp.task('concatJs', function() {
    return gulp.src(myPath.concatFromJs)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(myPath.concatToJs));
});

// CSS 压缩
gulp.task('minCss', ['concatCss'], function() {
    return gulp.src(myPath.minFromCss) // 源文件
        .pipe(minifycss()) // 执行压缩
        .pipe(gulp.dest(myPath.minToCss)); // 输出文件
});

// JavaScript 压缩
gulp.task('minJs', ['concatJs'], function() {
    return gulp.src(myPath.minFromJs) // 需要操作的文件
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest(myPath.minToJs)); // 输出
});

// 监听 CSS 文件改动
gulp.task('watch', function() {
    gulp.watch(myPath.minFromCss, ['minCss']);
    gulp.watch(myPath.minFromJs, ['minJs']);
});

// 浏览器自动刷新（当静态文件改变的时候）
gulp.task('sync', function() {
    browserSync.init([
        'index.html'
    ], {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(myPath.reloadFile).on('change', browserSync.reload);
});

// 默认任务
gulp.task('default', ['clean', 'sync'], function() {
    gulp.start('minCss', 'minJs', 'watch');
});
