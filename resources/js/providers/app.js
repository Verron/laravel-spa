import { Provider } from '../lib/support/provider';
import Vue from 'vue';
import Application from "../components/App";

// Install Libraries to Vue
async function libraries (Vue) {
}

export class App extends Provider {
    register() {
        Vue.use(libraries);
    }

    boot() {
        let store = this.app.make('store');

        this.app.instance('store.unsubscribe', store.subscribe((mutation) => {
            if (mutation.type === 'initialized') {
                this.initialize();
            }
        }));

        store.dispatch('initialize');
    }

    initialize() {
        this.app.make('store.unsubscribe')();
        this.app.forgetInstance('store.unsubscribe');

        this.app.instance('vue', new Vue({
            el: '#app',
            router: this.app.make('router').router(),
            store: this.app.make('store'),
            render: h => h(Application),
        }));
    }
}