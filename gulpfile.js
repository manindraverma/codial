//gulp library is used to minify the assets for better optimisation
const gulp=require('gulp');
// import gulp from 'gulp';
//gulp- sass library converts sass into css
const sass=require('gulp-sass')(require('node-sass'));
// import gulpSass from "gulp-sass";
// import nodeSass from "node-sass";
// var  sass = gulpSass(nodeSass);


//cssnano library compress the above  css file into one line

const cssnano=require('gulp-cssnano');
// import cssnano from 'gulp-cssnano';

//rev lobrary is use to rename the file along hash with  in the name

const rev=require('gulp-rev');
// import rev from 'gulp-rev';

//uglify library is used to minify js

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){

    console.log('empty the public -assets directory');
    del.sync(['./public/assets'], { force:true });
    //del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});


// function css(done) {
//     // place code for your default task here

//     console.log('minifying css...');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//      gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
//     // cb();
//   }

//   function js(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done()
//   }

//   function images(done){

//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();

//   }


//   function del(done){
//     dele.sync(['./public/assets'], { force:true });
//     done();
//   }


//   function build(done){
//     console.log('building')
//     done();

//   }
  
//   exports.default = series('clean','css','js','images','build','del');
