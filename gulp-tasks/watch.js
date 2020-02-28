let gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch('src/img/**', gulp.series('imagemin'))
	gulp.watch('src/scss/**/*.scss', gulp.series('styles'))
	gulp.watch('src/js/**/*.js', gulp.series('script'))
	gulp.watch('src/**/*.html', gulp.series('html'))
});
