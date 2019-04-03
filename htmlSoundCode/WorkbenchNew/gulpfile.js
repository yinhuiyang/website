var gulp = require('gulp');//打包工具
var browserify = require('browserify');// 模块化工具 cj模式
var watchify = require('watchify');// 模块改变监控
var babel = require("gulp-babel");// es5转es6
var connect = require('gulp-connect');//http服务器
var proxy = require('http-proxy-middleware');// http服务封装
var sass = require('gulp-sass');// scss解析
var minifyCss = require('gulp-minify-css');// css压缩
var source = require('vinyl-source-stream');// node文件流转vinyl流
var buffer = require('vinyl-buffer');// 确保流转化完全进入下一级
var uglify = require('gulp-uglify');// js压缩
var sourcemaps  = require('gulp-sourcemaps');// 生成.map文件
var minifyHtml = require('gulp-minify-html');// 压缩html

gulp.task('sass', function () {
  var css = gulp.src('./src/sass/*.scss')
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(gulp.dest('./src/build/css'));
  return css
})
gulp.task('sass-t', function () {
  var css = gulp.src("./src/build/css/Workbench.css")
  .pipe(gulp.dest('./src'));
  gulp.src('./src/Workbench.html').pipe(connect.reload())
  return css
})
gulp.task('sass-watch', function () {
  var g = gulp.watch('src/sass/*.scss', gulp.series('sass', 'sass-t'))
  return g
})

gulp.task('defect', function () {
  var b = browserify({
    entries: ['./src/build/js/Workbench.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  function bundle() {
    b.bundle()
    .on('error', console.error)
    .pipe(source('Workbench.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(uglify({
      mangle: {
        reserved: ['require' ,'exports' ,'module' ,'$', 'defect']
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/'));
    gulp.src('./src/Workbench.html').pipe(connect.reload())
  }
  bundle()
  b.on('update', bundle);
  return b
})
gulp.task('defect-one', function () {
  var b = browserify({
    entries: ['./src/build/js/Workbench.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  }).bundle()
  .on('error', console.error)
  .pipe(source('Workbench.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({largeFile: true}))
  .pipe(uglify({
    mangle: {
      reserved: ['require' ,'exports' ,'module' ,'$', 'defect']
    }
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/'));
  return b
})
gulp.task('babel', function () {
  var jsEs5 = gulp.src('./src/js/*.js')
  .pipe(babel({presets: ['env']}))
  .pipe(gulp.dest('./src/build/js'))
  return jsEs5
})
gulp.task('babel-watch', function () {
  var g = gulp.watch('src/js/*.js', gulp.series('babel'))
  return g
})

// gulp.task('html', function () {
//   var html = gulp.src('./src/html/index.html')
//   .pipe(minifyHtml())
//   .pipe(gulp.dest('./src/'))
//   gulp.src('./src/index.html').pipe(connect.reload())
//   return html
// })

// gulp.task('html-watch', function () {
//   gulp.watch('./src/html/index.html', gulp.series('html'))
// })

gulp.task('build', function () {
  // gulp.series('sass','babel', 'html', gulp.parallel( 'defect'))
  var build = gulp.src(['./src/build/css/Workbench.css', './src/Workbench.html', './src/Workbench.js', './src/Workbench.js.map'])
  .pipe(gulp.dest('./dist/'))
  return build;
})

gulp.task('connect', function () {
  connect.server({
    root: './',
    livereload: true,
    port: 8000,
    middleware: function (connect, opt) {
        return [
            proxy(["/api"], {
                target: 'http://192.168.81.43:8081/vrv.task/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
                headers:{
                  Cookie: 'JSESSIONID=203E7636C3245FA5B4F32F48B81B0C4F'
                }
            })
        ]
    }
  });
})

gulp.task('default', gulp.series('sass','babel', 'sass-t', gulp.parallel('babel-watch', 'sass-watch', 'defect', 'connect')));