const {series, parallel} = require('gulp')
const gulp = require('gulp')

const {appINDEXHTML, appHTML, appCSS, appServer, appJS, appIMG} = require('./gulpTasks/app')
const {depsCSS, depsFonts, depsjQuery} = require('./gulpTasks/deps')

module.exports.default = series(
    parallel(
        series(appINDEXHTML, appHTML, appCSS, appServer, appJS, appIMG),
        series(depsCSS, depsFonts, depsjQuery)
    )
)