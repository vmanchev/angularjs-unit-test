var gulp = require('gulp');
var wiredep = require('gulp-wiredep');
var inject = require('gulp-inject');

gulp.task('inject', function () {
  gulp.src('./app/layout/index.html')
          .pipe(wiredep())
          .pipe(inject(gulp.src('./app/**/*', {read: false})))
          .pipe(gulp.dest('./public'));
});


gulp.task('watch', function () {
  gulp.watch('./app/**/*', ['inject-custom']);
});

gulp.task('default', ['inject-vendor', 'inject-custom', 'watch']);

