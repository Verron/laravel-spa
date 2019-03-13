import { Route as RouteServiceProvider } from '../lib/router/provider';
import Vue from 'vue';
import VueRouter from 'vue-router';

export class Route extends RouteServiceProvider {
    register() {
        super.register();

        // Load Routes
        require('../routes')(this.router);
    }

    boot() {

    }
}