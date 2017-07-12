const Task_Config = {
    'phonegap_build': {
        'option': {
            'isRepository': 'true',  // Presence of a copy in the repository
            'appId': '2705308', // appID сan be obtained after the application is initialized build.phonegap.com
            'user': { // login and password build.phonegap.com
                'email': 'fmakareev@gmail.com',
                'password': '19980911Fender'
            },
            'platforms': [ // List of required platforms
                'android'
            ],
            'download': { // The directory where the application will be downloaded
                'android': 'build/android.apk'
            },
            'hydrates': true,
            'private': false,
            'title': 'TestApp'
        },
        'keys': { // List of passwords for application keys
            'ios': {
                "password": "foobar"
            },
            'android': {
                "key_pw": "foobar",
                "keystore_pw": "foobar"
            }
        }
    }
};

// phonegap_build_my_config

var gulp = require('gulp');
var git = require('gulp-git');
var push = require('gulp-git-push');
var phonegapBuild = require('gulp-phonegap-build');

// {dot: true} here to inlude .pgbomit file in zip
gulp.task('phonegap-build', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapBuild({
            'isRepository': Task_Config.phonegap_build.option.isRepository,
            'appId': Task_Config.phonegap_build.option.appId,
            'user': {
                'email': Task_Config.phonegap_build.option.user.email,
                'password': Task_Config.phonegap_build.option.user.password
            },
            'platforms': Task_Config.phonegap_build.option.platforms,
            'download': {
                'android': Task_Config.phonegap_build.option.download.android
            },
            'hydrates': false,
            'private': Task_Config.phonegap_build.option.private,
            'title': Task_Config.phonegap_build.option.title
        }));
});

gulp.task('git:add', function(){
    return gulp.src('./*')
        .pipe(git.add())
});
gulp.task('git:commit', function(){
    return gulp.src('./git-test/*')
        .pipe(git.commit('build app'));
});
gulp.task('git:push', function(){
    return gulp.src('./*')
        .pipe(git.add());
});

gulp.task('phonegap-build-debug', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapBuild({
            'isRepository': Task_Config.phonegap_build.option.isRepository,
            'appId': Task_Config.phonegap_build.option.appId,
            'user': {
                'email': Task_Config.phonegap_build.option.user.email,
                'password': Task_Config.phonegap_build.option.user.password
            },
            'platforms': Task_Config.phonegap_build.option.platforms,
            'download': {
                'android': Task_Config.phonegap_build.option.download.android
            },
            'hydrates': Task_Config.phonegap_build.option.hydrates,
            'private': Task_Config.phonegap_build.option.private,
            'title': Task_Config.phonegap_build.option.title
        }));
});

gulp.task('default', ['phonegap-build-debug']);