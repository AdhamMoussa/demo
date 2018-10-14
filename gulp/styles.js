let gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');


gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});