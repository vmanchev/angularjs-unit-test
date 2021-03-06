var angularTemplatecache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var inject = require('gulp-inject');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep');
var historyApiFallback = require('connect-history-api-fallback');


var path = {
  public: {
    web: 'public',
    js: 'public/js',
    uploads: 'public/uploads'
  },
  src: {
    misc: 'misc/test.pdf',
    js: ['app/**/*.js', '!app/**/*.spec.js'],
    html: ['app/**/*.html', '!app/index.html']
  }
};

gulp.task('server', function (done) {
  return browserSync(
    {
      server: {
        baseDir: path.public.web,
        middleware: [historyApiFallback()]
      }
    },
    done
  );
});

gulp.task('eslint', function () {
  return gulp.src('app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('copy:misc', function () {
  return gulp.src(path.src.misc)
    .pipe(gulp.dest(path.public.uploads));
});

gulp.task('minify:js', function () {
  var target = gulp.src(path.public.web + '/index.html');
  var js = gulp.src(path.src.js);

  return target
    .pipe(
      inject(
        js
          .pipe(concat('app.min.js'))
          // .pipe(
          //   uglify({
          //     mangle: false
          //   })
          // )
          .pipe(gulp.dest(path.public.js)),
        { relative: true, name: 'app' }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task('minify:vendors', function () {
  var target = gulp.src(path.public.web + '/index.html');
  var js = gulp.src(wiredep().js);

  return target
    .pipe(
      inject(
        js
          .pipe(concat('vendors.min.js'))
          //.pipe(uglify())
          .pipe(gulp.dest(path.public.js)),
        { relative: true, name: 'vendors' }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task('index', function () {
  return gulp.src('app/index.html').pipe(gulp.dest(path.public.web));
});

// make templateCache from all HTML filessrc
gulp.task('templates', function () {
  var target = gulp.src(path.public.web + '/index.html');
  var html = gulp.src(path.src.html);

  return target
    .pipe(
      inject(
        html
          .pipe(minifyHtml())
          .pipe(
            angularTemplatecache({
              module: 'angularjs-unit-test'
            })
          )
          .pipe(gulp.dest(path.public.js)),
        { name: 'templates', ignorePath: 'public' }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task('clean:public', function (cb) {
  return del([path.public.web + '/*'], cb);
});

gulp.task('reload', function () {
  return browserSync.reload();
});

gulp.task('watch', function (cb) {
  gulp.watch(['app/**/*.js', 'app/**/*.html'], function () {
    runSequence(
      'eslint',
      'clean:public',
      'copy:misc',
      'index',
      'minify:js',
      'minify:vendors',
      'templates',
      'reload',
      'watch',
      cb
    );
  });
});

gulp.task('default', function (cb) {
  runSequence(
    'eslint',
    'clean:public',
    'copy:misc',
    'index',
    'minify:js',
    'minify:vendors',
    'templates',
    'server',
    'watch',
    cb
  );
});
