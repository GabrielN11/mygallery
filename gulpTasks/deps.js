const gulp = require('gulp')
const uglifyCSS = require('gulp-uglifycss')
const concat = require('gulp-concat')

function depsCSS(){
    return gulp.src('src/dependencies/font-awesome/css/font-awesome.css')
        .pipe(uglifyCSS({"uglyComments": false}))
        .pipe(gulp.dest('build/dependencies/font-awesome/css/'))
}

function depsFonts(){
    return gulp.src('src/dependencies/font-awesome/fonts/*.*')
        .pipe(gulp.dest('build/dependencies/font-awesome/fonts'))
}

function depsjQuery(){
    return gulp.src('src/dependencies/jQuery/jquery.js')
        .pipe(gulp.dest('build/dependencies/jQuery'))
}

module.exports = {
    depsCSS,
    depsFonts,
    depsjQuery
}