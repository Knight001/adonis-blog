const gulp =require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const merge = require('merge2')


const path = {
  nodePath: 'node_modules',
  stylesPath: 'assets/scss',
  jsPath: 'assets/js'
}

gulp.task('move-icons', function(){
  return gulp
  .src([path.nodePath + '/feather-icons/dist/icons/*.svg'])
  .pipe(gulp.dest('./public/icons/'))
})

gulp.task('default', gulp.series('move-icons'))
