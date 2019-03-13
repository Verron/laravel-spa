export const middleware = function ({app, next, router}) {
    let store = app.make('store');

    if (store.state.auth.authenticated === false) {
        return next();
    }

    return router.push({path: '/home'});
}