const Task_Config = {
    'phonegap_build' : {
        'option' : {
            'isRepository': 'true',  // Налие копиии в репозитории
            'appId': '2705250', // appID можно получить после инициальзации приложения на build.phonegap.com
            'user': { // login and password build.phonegap.com
                'email': '',
                'password': ''
            },
            'platforms': [ // список необходимых платформ
                'android'
            ],
            'download': { // директория куда будет загружено приложение
                'android': 'dist/'
            }
        },
        'keys': { // список паролей для ключей приложений
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
var phonegapBuild = require('gulp-phonegap-build');

// {dot: true} here to inlude .pgbomit file in zip
gulp.task('phonegap-build', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapBuild({
            'isRepository': 'true',
            'appId': '2705250',
            'user': {
                'email': 'fmakareev@gmail.com',
                'password': '19980911Fender'
            }
        }));
});

gulp.task('phonegap-build-debug', function () {
    gulp.src('./**/*', {dot: true})
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
            }
        }));
});

gulp.task('default', ['phonegap-build-debug']);