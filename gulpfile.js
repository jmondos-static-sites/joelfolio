var gulp = require('gulp'),
		gutil = require('gulp-util')
		concat = require('gulp-concat'),
		uglify = require("gulp-uglify"),
		compass = require('gulp-compass'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber');


var path = {
	js: ['./js/lib/jquery.min.js', './js/lib/*.js', './js/app/*.js' ],
	sass: ['./sass/*.sass']
}
var onError = function(err) {
    gutil.beep();
    gutil.log(err);
};

gulp.task('js', function(){
	//gulp.src(['./js/lib/jquery.min.js','./js/lib/*.js', './js/app/*.js'])
	gulp.src(path.js)
			.pipe(concat('app.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('./js'));
});

gulp.task('compass', function(){
	gulp.src(path.sass)
	.pipe(plumber({ errorHandler: onError }))
	.pipe(compass({
		config_file: './sass/config.rb'
	}))
	.on('error', gutil.log)
	.pipe(gulp.dest('./css'))
});

gulp.task('sass', function(){
	gulp.src(path.sass)
		.pipe(sass( {style:'compressed', compass: true} ))
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