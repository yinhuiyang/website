var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require("gulp-babel");
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var minifyHtml = require('gulp-minify-html');

gulp.task('sass', function () {
  var css = gulp.src('./src/scss/*.scss')
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(gulp.dest('./src/build/css'))
  gulp.src('./src/index.html').pipe(connect.reload())
  return css
})

gulp.task('sass-watch', function () {
  var g = gulp.watch('src/scss/*.scss', gulp.series('sass'))
  return g
})

gulp.task('defect', function () {
  var b = browserify({
    entries: ['./src/build/js/alltask.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  function bundle() {
    b.bundle()
    .on('error', console.error)
    .pipe(source('alltask.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(uglify({
      mangle: {
        reserved: ['require' ,'exports' ,'module' ,'$', 'task']
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/'));
    gulp.src('./src/index.html').pipe(connect.reload())
  }
  bundle()
  b.on('update', bundle);
  return b
})

gulp.task('babel', function () {
  var jsEs5 = gulp.src(['./src/js/api/*.js', './src/js/content/*.js', './src/js/dialog/*.js', './src/js/index/*.js', './src/js/progress/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('./src/build/js'))
  return jsEs5
})
gulp.task('babel-watch', function () {
  var g = gulp.watch('src/js/**/*.js', gulp.series('babel'))
  return g
})

gulp.task('html', function () {
  var html = gulp.src('./src/html/index.html')
  .pipe(minifyHtml())
  .pipe(gulp.dest('./src/'))
  gulp.src('./src/index.html').pipe(connect.reload())
  return html
})

gulp.task('html-watch', function () {
  gulp.watch('./src/html/index.html', gulp.series('html'))
})

gulp.task('build', function () {
  var build = gulp.src(['./src/build/css/alltask.css', './src/index.html', './src/alltask.js', './src/alltask.js.map'])
  .pipe(gulp.dest('./dist/'))
  return build;
})

gulp.task('connect', function () {
  connect.server({
    root: './',
    livereload: true,
    port: 8080,
    middleware: function (connect, opt) {
        return [
            proxy(["/api"], {
                target: 'http://192.168.81.43:8081/vrv.task/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
                headers:{
                  Cookie: 'JSESSIONID=203E7636C3245FA5B4F32F48B81B0C4F; PHPSESSID=p6g3l0680dnqrkrfpnrfg557c2'
                }
            })
        ]
    }
  });
})

gulp.task('default', gulp.series('sass','babel', 'html', gulp.parallel('babel-watch', 'sass-watch', 'html-watch', 'defect', 'connect')));