let gulp = require('gulp'),
	gutil = require('gulp-util' ), //Вывод уведомления в консоль, так как в gulp нет встроенного лога
	ftp = require('vinyl-ftp'), // Диплой на хостинг через FTP
	rsync = require('gulp-rsync'); // Диплой на хостинг через SSH

gulp.task('deploy-build', () => {
	var conn = ftp.create({
		host: '',
		user: '',
		password: '',
		parallel: 10,
		log: gutil.log
	});
	var globs = [
		'./build/**/*.*'
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest(''));
});

/*
gulp.task('rsync', () => {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'user123@yousite.com',
		destination: 'www/yousite.com/',
		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
	//Документация: https://pinchukov.net/blog/gulp-rsync.html
});*/