let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');


gulp.task('libs-js', function() {
	return gulp.src([])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream: true}))
})