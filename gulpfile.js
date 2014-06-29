var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require("gulp-uglify");


//gulp.task('concat', ['jshint', 'templates', 'app', 'components', 'stylesheets', 'assets', 'index']);

gulp.task('concat', function(){
	//gulp.src(['./js/lib/jquery.min.js','./js/lib/*.js', './js/app/*.js'])
	gulp.src(['./js/lib/jquery.min.js', './js/lib/*.js', './js/app/*.js' ])
			.pipe(concat('app.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./js'));
});