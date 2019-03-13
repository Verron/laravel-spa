import { Provider } from '../support/provider';
import Vue from "vue";
import VueRouter from "vue-router";
import Router from '../router';

export class Route extends Provider {
    register() {
        Vue.use(VueRouter);

        this.router = new Router(this.app);
        this.app.singleton('router', this.router);
    }
}