let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger');

gulp.task('script', function() {
	return gulp.src('src/js/script.js')
		.pipe(rigger())
		.pipe(sourcemaps.init({largeFile: true}))
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({stream: true}))
})
