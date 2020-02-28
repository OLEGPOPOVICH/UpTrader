let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	htmlmin = require('gulp-htmlmin'); //Минификация HTML


gulp.task('php', function() {
	return gulp.src('src/**/*.php')
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream: true}))
})