const gulp = require( 'gulp');
const spritesmith = require( 'gulp.spritesmith');
const browserSync = require('browser-sync');
const stylus = require('gulp-stylus');




// ===========================================
//
//		Сервер
//
// ===========================================

gulp.task('server', function() {
	browserSync.init({
		server: './dist'
	});
	browserSync.watch(['./dist/*.html','./dist/css/style.css']).on('change', browserSync.reload);
});

// ===========================================
//
//		Спрайты
//
// ===========================================

gulp.task('png-sprite', function() {

	const spriteData = gulp.src('./app/sprite-png/*.{jpg,png}')
		.pipe(spritesmith({
			imgName: 'png-sprite.png',
			cssName: 'sprite-coords.styl',
			cssFormat: 'stylus',
			padding: 8,
			algorithm: 'binary-tree',
			cssTemplate: './core/template.mustache',
		}));

		spriteData.css
			.pipe(gulp.dest('./core'));

		spriteData.img
			.pipe(gulp.dest('./dist/img'));

	return spriteData;
});



// ===========================================
//
//		Стили
//
// ===========================================

gulp.task('style', function() {

	return gulp.src('./app/style.styl')
		.pipe(stylus({
			'include css': true
		}))
		.pipe(gulp.dest('./dist/css'))
});


// ===========================================
//
//		Вотчер
//
// ===========================================

gulp.task('watch', function() {
	// Стили
	gulp.watch(['./app/*.styl', './core/*.styl'], gulp.series('style'));

	// PNG Спрайты
	gulp.watch('./app/sprite-png/*.{png,jpg}', gulp.series('png-sprite'));

});



// ===========================================
//
//		Сборка проекта
//
// ===========================================
gulp.task('default',
	gulp.series('png-sprite', 'style',  gulp.parallel('server', 'watch'))
);