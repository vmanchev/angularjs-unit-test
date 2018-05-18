var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var wiredep = require('wiredep');
var inject = require('gulp-inject');

var path = {
  public: {
    web: 'public',
    js: 'public/scripts'
  },
  src: {
    js: [
      'app/**/*.js',
      '!app/**/*.spec.js'
    ]
  }
};

gulp.task('connect', function () {
  connect.server({
    root: path.public.web,
    port: 8888,
    livereload: true
  });
});

gulp.task('clean', function (cb) {
  del(path.public.web, cb);
});

gulp.task('inject', function () {
  var target = gulp.src('app/layout/index.html');
  var bowerJs = gulp.src(wiredep().js);
  var appJs = gulp.src(path.src.js);

  return target
    .pipe(inject(
      bowerJs.pipe(concat('bower.js')).pipe(gulp.dest(path.public.js)), {
        name: 'bower',
        ignorePath: path.public.web
      }))
    .pipe(inject(
      appJs.pipe(concat('main.js')).pipe(gulp.dest(path.public.js)), {
        name: 'main',
        ignorePath: path.public.web
      }))
    .pipe(gulp.dest(path.public.web));
});


gulp.task('watch', function () {
  gulp.watch(path.src.js, ['inject']);
});

gulp.task('default', ['clean', 'inject', 'watch', 'connect']);

