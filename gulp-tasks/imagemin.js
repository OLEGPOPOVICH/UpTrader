let gulp = require('gulp'),
	imagemin = require('gulp-imagemin');


gulp.task('imagemin', function() {
	return gulp.src('src/img/**')
		/*.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
		]))*/
		.pipe(gulp.dest('build/img'))
})