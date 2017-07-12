module.exports =  {
    'phonegap_build' : {
        'option' : {
            'isRepository': 'true',  // Налие копиии в репозитории
            'appId': '2705250', // appID можно получить после инициальзации приложения на build.phonegap.com
            'user': { // login and password build.phonegap.com
                'email': 'fmakareev@gmail.com',
                'password': '19980911Fender'
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