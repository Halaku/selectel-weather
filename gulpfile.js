/* jshint node: true */
'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');

// gulp.task('html', function() {
//   var YOUR_LOCALS = {};
//   gulp.src('builds/dev/**/*.jade')
//     .pipe(plumber())
//     .pipe(jade({
//       locals: YOUR_LOCALS,
//       pretty: '\t'
//     }))
//     .pipe(gulp.dest('builds/dev/'));
// });

gulp.task('html', function () {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  // gulp.src('builds/dev/app/style/*.scss')
  gulp.src('app/assets/style/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('csslibs', function() {
  gulp.src([
      'bower_components/angular/angular-csp.css',
      // 'bower_components/bootstrap/dist/css/bootstrap.css',
      // 'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
      // 'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  gulp.src([
      'app/**/*.js',
      // '!app/**/*_test.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(plumber())
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('jslibs', function() {
  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/ngAutocomplete/src/ngAutocomplete.js',
      // 'bower_components/angular-ui-router/release/angular-ui-router.js',
      // 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      // 'bower_components/angular-file-upload/dist/angular-file-upload.js',
      // 'bower_components/firebase/firebase-debug.js',
      // 'bower_components/angularfire/dist/angularfire.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/assets/img/*.*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img/'));

});

// gulp.task('sprite', function() {
//   var spriteData = gulp.src('builds/dev/app/img/sprite/*.png')
//     .pipe(plumber())
//     .pipe(spritesmith({
//       imgName: 'sprite.png',
//       imgPath: 'builds/dev/img/sprite.png',
//       cssName: '_sprite.scss',
//       padding: 50
//     }));
//   return spriteData
//     .pipe(gulpif(
//       '*.scss',
//       gulp.dest('builds/dev/app/style/_misc/'),
//       gulp.dest('builds/dev/img')
//     ));
// });

// gulp.task('fonts', function() {
//   gulp.src('bower_components/bootstrap/fonts/*.*')
//     .pipe(gulp.dest('builds/dev/fonts'));
// });


gulp.task('server', function() {
  browserSync({
    port: 8000,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch([
    'dist/*.html',
    'dist/*.js',
    'dist/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch('app/assets/style/**/*.scss', ['css']);
  gulp.watch('app/**/*.html', ['html']);
  // gulp.watch('builds/dev/app/jade/**/*.jade', ['html']);
  gulp.watch('app/**/*.js', ['js']);
});

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', [
  'html',
  'css',
  'csslibs',
  'js',
  'jslibs',
  'images',
  // 'fonts'
]);



//
// gulp.task('pjs', function () {
//   gulp.src([
//       'builds/dev/app/**/*.js',
//       '!builds/dev/app/**/*_test.js'
//     ])
//     .pipe(concat('app.js'))
//     .pipe(plumber())
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(gulp.dest('builds/prod'));
//   gulp.src([
//       'bower_components/angular/angular.min.js',
//       // 'bower_components/angular-route/angular-route.min.js',
//       // 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
//     ])
//     .pipe(concat('libs.js'))
//     .pipe(gulp.dest('builds/prod'));
// })
//
//
// gulp.task('pcss', function () {
//   gulp.src('builds/dev/app/style/main.scss')
//     .pipe(plumber())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(concat('app.css'))
//     .pipe(autoprefixer({
//   browsers: ['last 3 versions'],
//   cascade: false
// }))
//     .pipe(uglify())
//     .pipe(gulp.dest('builds/prod'));
//   gulp.src([
//       'bower_components/angular/angular-csp.css',
//       'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
//       'bower_components/bootstrap/dist/css/bootstrap.min.css',
//     ])
//     .pipe(concat('theme.css'))
//     .pipe(gulp.dest('builds/prod'));
// })
//
//
// gulp.task('phtml', function () {
//   gulp.src('builds/dev/**/*.html')
//     .pipe(gulp.dest('builds/prod'));
// })
//
//
// gulp.task('default', [
//   'jslibs',
//   'js',
//   'csslibs',
//   'css',
//   'watch',
//   'webserver'
// ]);
//
// gulp.task('prod', [
//   'pjs',
//   'pcss',
//   'phtml',
//   'pwatch',
//   'pwebserver'
// ]);
