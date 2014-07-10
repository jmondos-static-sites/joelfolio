var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require("gulp-uglify"),
		compass = require('gulp-compass'),
		sass = require('gulp-sass');


var path = {
	js: ['./js/lib/jquery.min.js', './js/lib/*.js', './js/app/*.js' ],
	sass: ['./sass/*.sass']
}

gulp.task('js', function(){
	//gulp.src(['./js/lib/jquery.min.js','./js/lib/*.js', './js/app/*.js'])
	gulp.src(path.js)
			.pipe(concat('app.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./js'));
});

gulp.task('compass', function(){
	gulp.src(path.sass)
	.pipe(compass({
		config_file: './sass/config.rb'
	}))
	.pipe(gulp.dest('./css'))
});

gulp.task('sass', function(){
	gulp.src(path.sass)
		.pipe(sass())
		.pipe(gulp.dest('./css'));
});



gulp.task('watch', function(){
	gulp.watch(path.js, ['js']);
	gulp.watch(path.sass, ['compass']);
});

gulp.task('fastwatch', function(){
	gulp.watch(path.js, ['js']);
	gulp.watch(path.sass, ['sass']);
});


gulp.task('default', ['watch']);