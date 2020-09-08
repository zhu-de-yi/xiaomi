const gulp = require("gulp");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");

gulp.task("scss", function () {
  return gulp
    .src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("scssAll", function () {
  return gulp
    .src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

gulp.task("scripts", function () {
  return gulp
    .src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

gulp.task("copy-html", function () {
  return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());
});

gulp.task("data", function () {
  return gulp
    .src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});

gulp.task(
  "build",
  ["scss", "scripts", "copy-html", "data", "scssAll"],
  function () {
    console.log("项目建立成功");
  }
);

/*
    建立监听
*/
gulp.task("watch", function () {
  gulp.watch("stylesheet/index.scss", ["scss"]);
  gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch(["*.json", "!package.json"], ["data"]);
  gulp.watch(["stylesheet/*.scss"], ["scssAll"]);
  gulp.watch("images/**/*", ["images"]);
  // gulp.watch("*.php", ['php']);
});

const connect = require("gulp-connect");
//启动临时服务器
gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 8887,
    livereload: true,
  });
});

gulp.task("default", ["server", "watch"]);
