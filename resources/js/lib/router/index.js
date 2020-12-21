import {createRouter, createWebHistory} from 'vue-router';
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
    {path: '/:pathMatch(.*)*', name: 'not-found', component: Error}
];

class Router {

    constructor(app) {
        this.app = app;
        this.routes = [];
    }

    get(path, component) {
        let route = new Route(this.app, this);

        this.routes.push(route);

        return route.path(path).component(component);
    }

    router() {
        if (!router) {

            router = createRouter({
                history: createWebHistory(),
                routes: [...translateRoutes(this, this.routes), ...defaultRoutes],
            });

            this.middleware = new Middleware(this.app, router, require('../../middleware').default);
        }

        return router;
    }
}

export default Router;
