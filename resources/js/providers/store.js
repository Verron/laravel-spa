import { Provider } from '../lib/support/provider';
import Vuex from 'vuex';
import Vue from 'vue';

export class Store extends Provider {
    register() {
        Vue.use(Vuex);

        this.app.bind('store', require('../store').store, true);
    }
}