var gulp            = require('gulp'),
    ifElse          = require('gulp-if-else'),
    git             = require('gulp-git'),
    config          = require('./global-config.json'),
    fileinclude     = require('gulp-file-include'),
    phonegapBuild   = require('gulp-phonegap-build'),
    changed         = require('gulp-changed');
    sass            = require('gulp-sass');

//
//
// CSS BUILD
//
//
gulp.task('css:sass', function () {
    return gulp.src(config.dev.src.dir + config.dev.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.css))
});
//
//
// HTML BUILD
//
//
gulp.task('html:build', function() {
    return gulp.src(config.dev.src.dir + config.dev.src.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.html));
});
//
//
// JAVASCRIPT BUILD
//
//
gulp.task('js', function () {
   return gulp.src(config.dev.src.dir + config.dev.src.js)
       .pipe(gulp.dest(config.dev.build.dir + config.dev.build.js))
});
//
//
// IMAGE BUILD
//
//
gulp.task('image:all', function () {
    return gulp.src(config.dev.src.dir + config.dev.src.images)
    .pipe(changed(config.dev.src.dir + config.dev.src.images))
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.images))
});

gulp.task('image:res', function () {
    return gulp.src(config.dev.src.dir + config.dev.src.res)
        .pipe(changed(config.dev.src.dir + config.dev.src.res))
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.res))
});

gulp.task('images', gulp.parallel('image:all','image:res'));
//
//
// PHONEGAP BUILD
//
//
gulp.task('phonegap:deploy', function () {
    gulp.src('www/**/*', {dot: true})
        .pipe(phonegapBuild({
            'isRepository': config.phonegap_build.option.isRepository,
            'appId': config.phonegap_build.option.appId,
            'user': {
                'email': config.phonegap_build.option.user.email,
                'password': config.phonegap_build.option.user.password
            },
            'platforms': config.phonegap_build.option.platforms,
            'download': {
                'android': config.phonegap_build.option.download.android
            },
            'hydrates': config.phonegap_build.option.hydrates,
            'private': config.phonegap_build.option.private,
            'title': config.phonegap_build.option.title
        }));
});

gulp.task('phonegap:dev', function () {
    return gulp.src('./www/**/*', {dot: true})
        .pipe(phonegapBuild({
            'isRepository': config.phonegap_build.option.isRepository,
            'appId': config.phonegap_build.option.appId,
            'user': {
                'email': config.phonegap_build.option.user.email,
                'password': config.phonegap_build.option.user.password
            },
            'platforms': config.phonegap_build.option.platforms,
            'download': {
                'android': config.phonegap_build.option.download.android
            },
            'hydrates': config.phonegap_build.option.hydrates,
            'private': config.phonegap_build.option.private,
            'title': config.phonegap_build.option.title
        }));
});
//
//
// XML
//
//
gulp.task('xml', function () {
    return gulp.src(config.dev.src.dir + config.dev.src.phonegapXML)
        .pipe(changed(config.dev.src.dir + config.dev.src.phonegapXML))
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.phonegapXML))
});
//
//
// SPALSH SCREEN
//
//
gulp.task('splashScreen', function () {
    return gulp.src(config.dev.src.dir + config.dev.src.splashScreen)
        .pipe(changed(config.dev.src.dir + config.dev.src.splashScreen))
        .pipe(gulp.dest(config.dev.build.dir + config.dev.build.splashScreen))
});
//
//
// GIT DEPLOY
//
//
gulp.task('git:add', function () {
    return gulp.src(['build/*', 'www/**/*.**', '.gitignore', 'gulpfile.js', 'package.json'])
        .pipe(git.add())
        .pipe(git.commit('initial commit'));

});
gulp.task('git:commit', function () {
    return gulp.src('./git-test/*')
});
gulp.task('git:push', function (callback) {
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });

    return callback();
});
gulp.task('git', gulp.series('git:add', 'git:commit', 'git:push'));


gulp.task('build:app', gulp.series('git','phonegap:dev'));


gulp.task('default', gulp.series(gulp.parallel('splashScreen','xml','images'),'css:sass','js','html:build', 'build:app') );


















//
gulp.task('ifelse', function () {
    return gulp.src('www/**/*')
        .pipe(ifElse(process.env.NODE_ENV === 'dep', function dep() {
            console.log("DEPLOY");
            return
        }, function dep() {
            console.log("DEV");
            return
        }))
});

gulp.task('my', function () {
    console.log(process.argv[3]);
});

