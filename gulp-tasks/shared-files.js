let gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('shared', function() {
	return gulp.src('src/**/*.+(json|php)')
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream: true}))
})