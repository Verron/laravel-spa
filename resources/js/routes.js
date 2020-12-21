module.exports = function (router) {
    router.get('/', require('./pages/Welcome').default).name('welcome');

    router.get('/login', require('./pages/Login').default).middleware('guest').name('login');

    router.get('/home', require('./pages/Home').default).middleware('auth').name('home');
};
