import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from "./components/App";
import Router from './lib/router/index';

let instance = null;
let initUnsubscribe = null;

const resolve = (abstract) => {
    if (instance === null) {
        // Probably throw some sort of exception. Not bootstrapped yet.
        return null
    }

    return instance.instances[abstract];
}

class Container {

    constructor(Vue)
    {
        this.vue = window.Vue = Vue;
    }

    async install (Vue) {
        Vue.use(VueRouter);
        Vue.use(Vuex);
    }

    instance()
    {
        if (instance === null) {
            let created = instance = new Container(Vue);

            created.bootstrap();

            return created;
        }

        return instance;
    }

    bootstrap()
    {
        instance = this;
        this.vue.use(this.install);
        this.instances = [];

        // Can separte this out to providers, but bootstrap needed things
        this.instances['router'] = new Router(this);
        this.instances['store'] = require('./lib/store').store;

        initUnsubscribe = this.instances['store'].subscribe((mutation, state) => {
            if (mutation.type === 'initialized') {
                this.initialize();
            }
        });

        this.instances['store'].dispatch('initialize');
    }

    initialize() {
        initUnsubscribe();
        this.application = new Vue({
            el: '#app',
            router: this.make('router').router(),
            store: this.make('store'),
            render: h => h(App),
        });
    }
    
    make(abstract) {
        return resolve(abstract);
    }
}

export default Container
