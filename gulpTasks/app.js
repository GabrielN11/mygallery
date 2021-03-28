const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

function appINDEXHTML(){
    return gulp.src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'))
}
function appHTML(){
    return gulp.src('src/pages/*.html')
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(gulp.dest('build/pages'))
}

function appCSS(){
    return gulp.src('src/css/style.css')
        .pipe(uglifycss({'uglyComments': true}))
        .pipe(gulp.dest('build/css'))
}

function appServer(){
    return gulp.src('src/server.js')
        .pipe(gulp.dest('build'))
}

function appJS(){
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            comments: false,
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
}

function appIMG(){
    return gulp.src('src/imgs/**/*.*')
        .pipe(gulp.dest('build/imgs'))
}

gulp.task('appINDEXHTML', appINDEXHTML)
gulp.task('appHTML', appHTML)
gulp.task('appCSS', appCSS)
gulp.task('appServer', appServer)
gulp.task('appJS', appJS)
gulp.task('appIMG', appIMG)

module.exports = {
    appINDEXHTML,
    appHTML,
    appCSS,
    appServer,
    appJS,
    appIMG
}