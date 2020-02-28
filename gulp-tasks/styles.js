let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require("gulp-notify"), // Водит ошибки при сборке Gulp в виде системных сообщений
	autoprefixer = require('gulp-autoprefixer');

/* clean css - минификация для css */

gulp.task('styles', function(){
	return gulp.src(['src/scss/main.scss'])
		.pipe(sourcemaps.init({largeFile: true}))
		/*.pipe(concat('style.scss'))*/
		.pipe(autoprefixer({
			cascade: false,
			overrideBrowserslist : ['>0.1%']
        }))
		.pipe(sass({outputStyle: "compressed"}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.reload({stream: true}))
});