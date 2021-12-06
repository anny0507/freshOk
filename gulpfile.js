const { src, dest, watch, parallel, series } = require('gulp');
const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const browserSync  = require('browser-sync').create();
const svgSprite    = require('gulp-svg-sprite');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false  
  });
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true
  }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function scripts() {
  return src(
    [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/mixitup/dist/mixitup.min.js',
      'app/js/main.js'
    ]
  )
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
	    imagemin.mozjpeg({quality: 75, progressive: true}),
	    imagemin.optipng({optimizationLevel: 5}),
	    imagemin.svgo({
        plugins: [
          {removeViewBox: true},
			    {cleanupIDs: false}
		    ]
	    })
    ])
  )
  .pipe(dest('dist/images'))  
}

function svgSprites() {
  return src('app/images/icons/*.svg') 
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // указываем имя файла спрайта и путь
          },
        },
      })
    )
    .pipe(dest('app/images')); 
}

function svgBrends() {
  return src('app/images/brends/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../brends.svg', // указываем имя файла спрайта и путь
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/images/icons/*.svg'], svgSprites);
  watch(['app/images/brends/*.svg'], svgBrends);
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
  
}



exports.styles      = styles;
exports.scripts     = scripts;
exports.browsersync = browsersync;
exports.images      = images;
exports.svgSprites  = svgBrends;
exports.svgBrends = svgBrends;
exports.cleanDist   = cleanDist;
exports.build       = series(cleanDist, images, build);

exports.default = parallel(svgSprites, svgBrends, styles, scripts, browsersync, watching)
