
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
    constructor(router) {
        this.router = router;
        
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
                to,
            };
            const nextMiddleware = nextFactory(context, middleware, 1);

            return typeof middleware[0] === 'function' ? middleware[0]({...context, next: nextMiddleware}) : next();
        }

        return next();
    }
}

export default Middleware;