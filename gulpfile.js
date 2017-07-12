var gulp = require('gulp');
var phonegapBuild = require('gulp-phonegap-build');

// {dot: true} here to inlude .pgbomit file in zip
gulp.task('phonegap-build', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapBuild({
            "isRepository": "false",
            "appId": "com.phonegap.helloworld",
            "user": {
                "email": "fmakareev@gmail.com",
                "password": "19980911Fender"
            }
        }));
});

gulp.task('phonegap-build-debug', function () {
    gulp.src('./**/*', {dot: true})
        .pipe(phonegapBuild({
            "appId": "com.phonegap.helloworld",
            "user": {
                "email": "fmakareev@gmail.com",
                "password": "19980911Fender"
            },
            "platforms": [
                'android'
            ],
            "download": {
                "android": 'dist/android.apk'
            }
        }));
});

gulp.task('default', ['phonegap-build-debug']);