
const toVueRoute = function (route) {
    let result = {};

    result.path = route.routePath;
    result.component = route.routeComponent;

    if (route.routeMiddleware) {
        result.meta = {middleware: {action: route.routeMiddleware, params: route.routeMiddlewareParameters}};
    }

    if (route.routeName) {
        result.name = route.routeName;
    }

    return result;
};

class Route {

    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.routePath = null;
        this.routeComponent = null;
        this.routeMiddleware = null;
        this.routeMiddlewareParameters = [];
    }

    name(name) {
        this.routeName = name;

        return this;
    }

    path(path) {
        this.routePath = path;

        return this;
    }

    component(component) {
        this.routeComponent = component;

        return this;
    }

    middleware(middleware) {
        if (typeof middleware === 'string') {
            let parts = middleware.split(':');
            let name = parts[0];
            let parameters = [];
            if (parts[1]) {
                parameters = parts[1].split(',');
            }

            this.routeMiddleware = name;
            this.routeMiddlewareParameters = parameters;

            return this;
        }
        this.routeMiddleware = middleware;

        return this;
    }

    translate() {
        return toVueRoute(this);
    }
}

export default Route;