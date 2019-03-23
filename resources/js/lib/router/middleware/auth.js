export const middleware = function ({app, next, router}, redirectTo = '/login') {
    let store = app.make('store');

    if (store.state.auth.authenticated === true) {
        return next();
    }

    return router.push({path: redirectTo});
}