import VueRouter from 'vue-router';
import Middleware from './middleware';
import Route from './route';
import Error from '../../pages/Error';

let router = null;

const translateRoutes = function (router, routes) {
    let results = [];

    routes.forEach((route) => {
        results.push(route.translate())
    });

    return results;
};

const defaultRoutes = [
    {path: '*', component: Error}
];

class Router {

    constructor(app) {
        this.app = app;
        this.routes = [];
        this.intended = null;
    }

    get(path, component) {
        let route = new Route(this.app, this);

        this.routes.push(route);

        return route.path(path).component(component);
    }

    router() {
        if (!router) {

            require('../../routes')(this);

            router = new VueRouter({
                routes: [...translateRoutes(this, this.routes), ...defaultRoutes],
                mode: 'history',
            });

            router.beforeEach((to, from, next) => {this.setIntended(to); return next();});

            this.middleware = new Middleware(this.app, router, require('../../middleware').default);
        }

        return router;
    }

    setIntended(destination) {
        this.intended = destination;
    }
}

export default Router;