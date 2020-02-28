let gulp = require('gulp'),
	browserSync = require('browser-sync');


gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts/'))
		.pipe(browserSync.reload({stream: true}))
})