var gulp = require('gulp');
// var  browserify = require('browserify');
// var sequence = require('run-sequence');
// var watchify = require('watchify');
// var babel = require("gulp-babel")
// var connect = require('gulp-connect');
// var proxy = require('http-proxy-middleware');
// var fs = require('fs');
gulp.task('default',function (){
  console.log(gulp.hasTask("babel"))
  // sequence('babel', 'babelWatch','server','Workbench')
});
gulp.task('Workbench',function () {
  var b = browserify({
    entries: ['bulid/js/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  function bundle() {
    b.bundle().on('error', console.error).pipe(fs.createWriteStream('Workbench.js'));
    gulp.src('Workbench.html').pipe(connect.reload())
  }
  bundle()
  b.on('update', bundle);
});
gulp.task('babel', function () {
  gulp.src(['./js/index.js', './pageView/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('./bulid/js'))
});
gulp.task('babelWatch', function () {
  gulp.watch(['js/index.js', 'Workbench.html'], function () {
    sequence('babel')
  })
});
gulp.task('server', function () {
  connect.server({
    root: './',
    livereload: true,
    port: 8000,
    middleware: function (connect, opt) {
        return [
            proxy(["/api"], {
                target: 'http://192.168.81.17:8081/vrv.task',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                },
                headers:{
                  Cookie: 'JSESSIONID=273379717DBBE67DC4A7A793B568053A'
                }
            })
        ]
    }
  });
});