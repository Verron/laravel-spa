import { Provider } from '../lib/support/provider';
import Application from "../components/App";
import { createApp, h } from 'vue';

// Install Libraries to Vue
async function libraries (Vue) {
}

export class App extends Provider {
    register() {
        // Vue.use(libraries);

        // this.loadComponents(Vue);
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

        let instance = createApp({
            render: () => h(Application),
            components: this.loadComponents()
        });

        // Vuex Store
        instance.use(this.app.make('store'));

        // Vue Router
        instance.use(this.app.make('router').router());

        instance.mount('#app');

        this.app.instance('vue', instance);

        // this.app.instance('vue', new Vue({
        //     el: '#app',
        //     router: this.app.make('router').router(),
        //     store: this.app.make('store'),
        // }));
    }

    loadComponents() {
        const files = require.context('../components', true, /\.vue$/i),
            prefixComponentName = '',
            postfixComponentName = '-component';

        const components = {};

        files.keys().map(key => {
            let file_parts = key.split('/');
            let name = '';
            let component_name = file_parts.pop();

            file_parts.forEach((part_name) => {
                if (part_name && part_name !== '.') {
                    name += `${part_name}-`;
                }
            });

            components[`${prefixComponentName}${name}${component_name.split('.')[0].toLowerCase()}${postfixComponentName}`] = files(key).default;
        });

        return components;
    }
}
