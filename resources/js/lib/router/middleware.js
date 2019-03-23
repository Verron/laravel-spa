
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

class Middleware {
    constructor(app, router, registrar) {
        this.app = app;
        this.router = router;
        this.registrar = registrar;

        this.router.beforeEach((to, from, next) => this.handle(to, from, next));
    }

    handle(to, from, next) {
        if (to.meta.middleware) {
            const middleware = Array.isArray(to.meta.middleware)
                ? to.meta.middleware
                : [to.meta.middleware];

            const context = {
                from,
                next,
                router: this.router,
                app: this.app,
                to,
            };
            const nextMiddleware = nextFactory(context, middleware, 1);

            return this.resolve(middleware[0].action).apply(null, [{...context, next: nextMiddleware}, ...middleware[0].params]);
        }

        return next();
    }

    resolve(middleware) {
        if (typeof middleware === 'function') {
            return middleware;
        }

        if (this.registrar.hasOwnProperty(middleware) && typeof this.registrar[middleware] === 'function') {
            return this.registrar[middleware];
        }

        throw `Middleware not found: ${middleware}`;
    }
}

export default Middleware;