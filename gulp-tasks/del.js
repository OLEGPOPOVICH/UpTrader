let gulp = require('gulp'),
	del = require('del');

gulp.task('del', function() {
	return del(['build/*', 'preFtp/*', '!.vscode/sftp.json'])
});

gulp.task('del-parts', function() {
	return del(['build-parts/*'])
});