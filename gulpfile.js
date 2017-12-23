'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	reload = browserSync.reload,
	ghPages = require('gulp-gh-pages');

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./dist/assets'))
		.pipe(reload({stream: true}));
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

gulp.task('cname', function() {
	return gulp.src('./CNAME')
		.pipe(gulp.dest('./dist'))
});

gulp.task('html', function() {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream: true}));
});

gulp.task('js', function() {
	return gulp.src('./src/main.js')
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('./src/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(reload({stream: true}));
});

gulp.task('build', ['sass', 'html', 'js', 'assets']);

gulp.task('deploy', ['build', 'cname'], function() {
	return gulp.src('./dist/**/*')
		.pipe(ghPages());
});

gulp.task('serve', ['browser-sync', 'build'], function() {
	gulp.watch("src/assets/**/*", ['assets'], function() {reload();});
	gulp.watch("src/index.html", ['html'], function() {reload();});
	gulp.watch("src/main.scss", ['sass'], function() {reload();});
	gulp.watch("src/main.js", ['js'], function() {reload();});
});

gulp.task('default', ['clean', 'serve']);