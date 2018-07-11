// Pastas
var scssFiles = 'src/sass/**/*.scss';
var jsFiles = 'src/js/**/*.js';
var imgFiles = './src/img/*';
var siteFiles = './public/**/*';
var bootstrapCss = 'src/libs/bootstrap/dist/css/bootstrap.css';
var bootstrapCssMap = 'src/libs/bootstrap/dist/css/bootstrap.css.map';
var bootstrapJs = 'src/libs/bootstrap/dist/js/bootstrap.js';
var jquery = 'src/libs/jquery/dist/jquery.js';

// Pastas de destino
var cssDest = './public/src/css';
var imgDest = './public/src/img';
var jsDest = './public/src/js';
var arqsDest = './deploy';
var jquerySend = './public/src/lib/js';
var bootstrapSendJs = './public/src/lib/js';
var bootstrapSendCss = './public/src/lib/css';

// Juntar e converter para css
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Comprimir e mimificar o codigo
var sassProdOptions = {
  outputStyle: 'compressed'
}

//Nome do arquivo de deploy
var nameArq = 'chess';

//Dependencias do Gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
const image = require('gulp-image');
const minify = require('gulp-minify');
const zip = require('gulp-zip');

//Função de erro
function theError(error){
    console.log("Error SASS!  " +error);
}

// Task Sass
gulp.task('sass', function () {
 return gulp.src(scssFiles)
   .pipe(sass(sassDevOptions).on('error', sass.logError))
   .pipe(gulp.dest(cssDest));
});

// Task Script
gulp.task('script', function () {
 return gulp.src(jsFiles)
   .pipe(concat('chess.js'))
   //.pipe(minify())
   .pipe(gulp.dest(jsDest));
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

// Task Copy Libs
gulp.task('copylibs', function () {
  gulp.src(jquery)
   .pipe(gulp.dest(jquerySend));
  gulp.src(bootstrapJs)
   .pipe(gulp.dest(bootstrapSendJs));
  gulp.src(bootstrapCss)
   .pipe(gulp.dest(bootstrapSendCss));
  gulp.src(bootstrapCssMap)
   .pipe(gulp.dest(bootstrapSendCss));
});

//Task Deploy
gulp.task('deploy', function(){
  gulp.src(siteFiles)
        .pipe(zip(nameArq+'.zip'))
        .pipe(gulp.dest(arqsDest))
});

// Default task
gulp.task('default', ['sass','script','image','copylibs'], function() {
  gulp.watch(scssFiles,['sass']);
  gulp.watch(jsFiles,['script']);
  gulp.watch(imgFiles,['image']);
});
