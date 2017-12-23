'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	reload = browserSync.reload;

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./dist/assets'))
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('clean', function(done) {
	del.sync([
		'./dist/**/*'
	]);
	done();
});

gulp.task('html', function() {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream:true}));
});

gulp.task('sass', function() {
	return gulp.src('./src/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream:true}));
});

gulp.task('serve', ['browser-sync', 'sass', 'html', 'assets'], function() {
	gulp.watch("src/assets/**/*", ['assets'], function() {reload();});
	gulp.watch("src/index.html", ['html'], function() {reload();});
	gulp.watch("src/main.scss", ['sass'], function() {reload();});
});
gulp.task('default', ['clean', 'serve']);