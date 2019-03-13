
import { providers } from './providers';

let container = null;

class Container {

    constructor(Vue)
    {
        this.vue = window.Vue = Vue;
        this.bindings = [];
        this.instances = [];
        this.resolved = [];
        this.providers = [];
    }

    async install (Vue) {
        Vue.use(VueRouter);
        Vue.use(Vuex);
    }

    static instance()
    {
        if (container === null) {
            let created = container = new Container(Vue);

            created.bootstrap();

            return created;
        }

        return container;
    }

    bootstrap()
    {
        container = this;

        this.register(providers).then(() => this.boot(providers));
    }

    register(providers) {
        return new Promise((resolve, reject) => {
            try {
                for (let p in providers) {
                    this.providers[p] = new providers[p](this);

                    this.providers[p].register();
                }

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    boot(providers) {
        return new Promise((resolve, reject) => {
            try {
                for (let p in providers) {
                    this.providers[p].boot();
                }

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }
    
    make(abstract) {
        return this.resolve(abstract);
    }

    build(concrete, parameters = []) {
        return concrete(parameters);
    }
    resolve(abstract) {

        if (this.instances[abstract]) {
            return this.instances[abstract];
        }

        let concrete = this.getConcrete(abstract);

        let instance = null;

        if (this.isBuildable(concrete)) {
            instance = this.build(concrete);
        } else {
            instance = this.make(concrete);
        }

        if (this.isShared(abstract)) {
            this.instances[abstract] = instance;
        }


        this.resolved[abstract] = true;

        return instance;
    }

    isBuildable(concrete, abstract) {
        return typeof concrete === 'function';
    }

    getClosure(abstract, concrete) {
        return (...parameters) => {
            if (abstract === concrete) {
                return this.build(concrete);
            }
            return concrete;
        }
    }

    isShared(abstract) {
        return this.instances[abstract] || (typeof this.bindings[abstract] === 'object' && this.bindings[abstract]['shared'] === true);
    }

    getConcrete(abstract) {
        if (typeof this.bindings[abstract] === 'object') {
            return this.bindings[abstract]['concrete'];
        }

        return abstract;
    }

    bind(abstract, concrete, shared = false) {

        if (typeof concrete !== 'function') {
            concrete = this.getClosure(abstract, concrete);
        }

        this.bindings[abstract] = {concrete, shared};
    }
    singleton(abstract, concrete) {
        this.bind(abstract, concrete, true);
    }

    instance(abstract, instance) {
        this.instances[abstract] = instance;
    }

    forgetInstance(abstract) {
        delete this.instances[abstract];
    }
}

export default Container
