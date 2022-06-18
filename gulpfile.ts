import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const sass = require('gulp-sass')(require('sass'))

gulp.task('sass', function() {
    const processors = [
        autoprefixer,
        cssnano
    ]
    return gulp
        .src('./styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./styles/css'))
})

gulp.task('watch', function() {
    gulp.watch('./styles/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.series('sass', 'watch'))