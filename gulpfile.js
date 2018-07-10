/*
 * Variables
 */
// Sass Source
var scssFiles = './src/sass/*.scss';
var imgFiles = './src/img/*';

// CSS destination
var cssDest = './public/src/css';
var imgDest = './public/src/img';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

var gulp = require('gulp');
var sass = require('gulp-sass');
const image = require('gulp-image');


function theError(error){
    console.log("Error SASS!  " +error);
}

// default sass tasks
gulp.task('sass', function () {
  console.log('Inicia Sass');
 return gulp.src(scssFiles)
   .pipe(sass(sassProdOptions).on('error', sass.logError))
   .pipe(gulp.dest(cssDest));
});

//Otimização de imagem
gulp.task('image', function () {
  gulp.src(imgFiles)
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest(imgDest));
});

// Default task
gulp.task('default', ['sass', 'image'], function() {

});
