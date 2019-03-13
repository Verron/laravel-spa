
const toVueRoute = function (route) {
    let result = {};

    result.path = route.routePath;
    result.component = route.routeComponent;

    if (route.routeMiddleware) {
        result.meta = {middleware: [route.routeMiddleware]};
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
        this.routeMiddleware = middleware;

        return this;
    }

    translate() {
        return toVueRoute(this);
    }
}

export default Route;