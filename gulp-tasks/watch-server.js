let gulp = require('gulp'),
	del = require('del'),
	ftp = require('vinyl-ftp'), // Диплой на хостинг через FTP
	gutil = require('gulp-util' ), //Вывод уведомления в консоль, так как в gulp нет встроенного лога
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require("gulp-notify"), // Водит ошибки при сборке Gulp в виде системных сообщений
	autoprefixer = require('gulp-autoprefixer');



gulp.task('watch', function() {
	gulp.watch("./src/**/*.*").on('change', function(path, stats) {                     
		/*console.log('Changes detected in app/ file "' + path + '", ' + stats);*/
		if(path.substr(-4) == "scss") {
			return gulp.src(['src/scss/main.scss'])
				.pipe(sourcemaps.init({largeFile: true}))
				.pipe(concat('style.scss'))
				.pipe(autoprefixer({
					cascade: false,
					overrideBrowserslist : ['>0.1%']
				}))
				.pipe(sass({outputStyle: "compressed"}).on("error", notify.onError()))
				.pipe(rename({suffix: '.min'}))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./preFtp/css'))
				.pipe(browserSync.reload({stream: true}))
		} else {
			gulp.src(path, { base: './src', buffer: false })       
			.pipe(gulp.dest('./preFtp'))    
		}                                                                                                                  
	});
	gulp.watch("./preFtp/**/*.*", gulp.series('deploy','delPreFtp'))
});

gulp.task('deploy', () => {
	var conn = ftp.create({
		host:      '',
		user:      '',
		password:  '',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'./preFtp/**/*.*',
	/*'dist/.htaccess',*/
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest(''));
});

gulp.task('delPreFtp', function() {
	return del(['preFtp/*'])
});

