var angularFilesort = require("gulp-angular-filesort");
var angularTemplatecache = require("gulp-angular-templatecache");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var del = require("del");
var gulp = require("gulp");
var inject = require("gulp-inject");
var minifyHtml = require("gulp-minify-html");
var runSequence = require("run-sequence");
var uglify = require("gulp-uglify");
var wiredep = require("wiredep");

var path = {
  public: {
    web: "public",
    js: "public/js"
  },
  src: {
    js: ["app/**/*.js", "!app/**/*.spec.js"],
    html: ["app/**/*.html", "!app/index.html"]
  }
};

gulp.task("server", function(done) {
  return browserSync(
    {
      server: {
        baseDir: path.public.web
      }
    },
    done
  );
});

gulp.task("minify:js", function() {
  var target = gulp.src(path.public.web + "/index.html");
  var js = gulp.src(path.src.js);

  return target
    .pipe(
      inject(
        js
          .pipe(concat("app.min.js"))
          .pipe(
            uglify({
              mangle: false
            })
          )
          .pipe(gulp.dest(path.public.js)),
        { relative: true, name: "app" }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task("minify:vendors", function() {
  var target = gulp.src(path.public.web + "/index.html");
  var js = gulp.src(wiredep().js);

  return target
    .pipe(
      inject(
        js
          .pipe(concat("vendors.min.js"))
          //.pipe(uglify())
          .pipe(gulp.dest(path.public.js)),
        { relative: true, name: "vendors" }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task("index", function() {
  return gulp.src("app/index.html").pipe(gulp.dest(path.public.web));
});

// make templateCache from all HTML filessrc
gulp.task("templates", function() {
  var target = gulp.src(path.public.web + "/index.html");
  var html = gulp.src(path.src.html);

  return target
    .pipe(
      inject(
        html
          .pipe(minifyHtml())
          .pipe(
            angularTemplatecache({
              module: "angularjs-unit-test"
            })
          )
          .pipe(gulp.dest(path.public.js)),
        { name: "templates", ignorePath: "public" }
      )
    )
    .pipe(gulp.dest(path.public.web));
});

gulp.task("clean:public", function(cb) {
  return del([path.public.web + "/*"], cb);
});

gulp.task("reload", function() {
  return browserSync.reload();
});

gulp.task("build:basic", function*(cb) {
  runSequence(
    "clean:public",
    "index",
    "minify:js",
    "minify:vendors",
    "templates",
    "reload",
    cb
  );
});

gulp.task("watch", function(cb) {
  gulp.watch(["app/**/*.js", "app/**/*.html"], function() {
    runSequence(
      "clean:public",
      "index",
      "minify:js",
      "minify:vendors",
      "templates",
      "reload",
      "watch",
      cb
    );
  });
});

gulp.task("default", function(cb) {
  runSequence(
    "clean:public",
    "index",
    "minify:js",
    "minify:vendors",
    "templates",
    "server",
    "watch",
    cb
  );
});
