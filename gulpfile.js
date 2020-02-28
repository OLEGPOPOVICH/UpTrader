let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	requireDir = require("require-dir");

/* 
1. npm install - качаем папку node_modules 
2. Настраиваем зависимости
3. Запускаем сборку 'gulp'

Команды 
	- gulp - запускает полую сборку проекта из папки src в папку build и запускает отслеживания любых файлов на изменения
	- gulp build - запускает полую сборку проекта из папки src в папку build
	- gulp deploy-build - запускает полую сборку проекта из папки build на сервер (хостинг)
*/

requireDir("./gulp-tasks/");

gulp.task('browser-sync', function() {
	/*browserSync.init({
		open: false,
		injectChanges: true,
		proxy: ''
	})*/
	browserSync.init({
		/*proxy: ''*/
		server: {
			baseDir: './build/'
		}
	})
});


gulp.task('build', gulp.series('del', gulp.parallel('styles', 'script', 'libs-js', 'fonts', 'imagemin', 'html', 'shared')));
gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));