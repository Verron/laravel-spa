import { Provider } from '../lib/support/provider';
import Vue from 'vue';
import Application from "../components/App";

// Install Libraries to Vue
async function libraries (Vue) {
}

export class App extends Provider {
    register() {
        Vue.use(libraries);

        this.loadComponents(Vue);
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

    loadComponents(VueInstance) {
        const files = require.context('../', true, /\.vue$/i);

        files.keys().map(key => {
            let file_parts = key.split('/');
            let name = '';
            let component_name = file_parts.pop();

            file_parts.forEach((part_name) => {
                if (part_name && part_name !== '.') {
                    name += `${part_name}-`;
                }
            });

            VueInstance.component(`${name}${component_name.split('.')[0].toLowerCase()}`, files(key).default)
        });
    }
}