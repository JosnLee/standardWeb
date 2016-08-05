var gulp = require('gulp'),
  jscs = require('gulp-jscs'),
  eslint = require('gulp-eslint'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  wrap = require('gulp-wrap'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  server = require('gulp-express'),
  htmlreplace = require('gulp-html-replace'),
  cssmin = require('gulp-cssmin'),
  uuid = require('node-uuid'),
  minifyHtml = require("gulp-minify-html"),
  sourcemaps = require('gulp-sourcemaps');
var production_version_uuid = '.' + uuid.v1();
var wwwroot = './public/';
var paths = {
  index: [wwwroot + 'index.html'],
  scripts: [wwwroot + 'js/**/*.js', wwwroot + 'js/*.js', wwwroot + 'js/**/**/*.js'],
  styles: [wwwroot + 'css/*.css',wwwroot+'css/**/*.css'],
  tplsrc:[wwwroot+'tplsrc/**/**'],
  templates: [wwwroot + 'templates']
};
gulp.task('clean', function () {
  return del([wwwroot + 'min']);
});

gulp.task('scriptsProduction', function () {
  return gulp.src(paths.scripts)
    .pipe(ngAnnotate())
    .pipe(concat('m.js'))
    .pipe(wrap('(function(window){\n"use strict"\n<%= contents %>\n})(window);'))
    .pipe(concat('app.min' + production_version_uuid + '.js'))
    .pipe(uglify())
    .pipe(gulp.dest(wwwroot + 'min'));
});
gulp.task('htmlProduction', function () {
  gulp.src(paths.tplsrc) // 要压缩的html文件
    .pipe(minifyHtml())    //压缩
    .pipe(gulp.dest(wwwroot+'templates'));
});

gulp.task('stylesProduction', function () {
  return gulp.src(paths.styles)
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(concat('app.min' + production_version_uuid + '.css'))
    .pipe(gulp.dest(wwwroot + 'min'));
});

//替换页面的css和js加入uuid  生产环境
gulp.task('templatesProduction', function () {
  gulp.src(paths.index)
    .pipe(htmlreplace({
      'js': '/min/app.min' + production_version_uuid + '.js'
    }, {
      keepUnassigned: true,
      keepBlockTags: true,
      resolvePaths: false
    }))
    .pipe(htmlreplace({
      'css': '/min/app.min' + production_version_uuid + '.css'
    }, {
      keepUnassigned: true,
      keepBlockTags: true,
      resolvePaths: false
    }))
    .pipe(gulp.dest(wwwroot));
});

// TODO edit lint src
var lintSrc = ['gulpfile.js'];

// JSCS
gulp.task('jscs', function () {

  return gulp.src(lintSrc)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// ESLINT
gulp.task('eslint', function () {

  return gulp.src(lintSrc)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['build']);
  gulp.watch(paths.styles, ['build']);
  gulp.watch(paths.tplsrc, ['build']);
});
// test TODO add test src
gulp.task('test', ['jscs', 'eslint']);

gulp.task('server', function () {
  server.run(['./bin/www.js']);
});

gulp.task('default', ['clean', 'scriptsProduction', 'stylesProduction', 'templatesProduction','server','watch']);
gulp.task('build', ['clean', 'scriptsProduction', 'stylesProduction', 'templatesProduction','htmlProduction']);

