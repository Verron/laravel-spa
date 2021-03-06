// Private methods can go here

import Vuex from 'vuex';
import { version as VueVersion } from 'vue';

export const store = {
    namespaced: true,
    strict: true,
    state: {
        initialized: false,
        version: null,
        laravel_version: null,
        vue_version: null,
        vuex_version: null,
        vue_router_version: null,
    },
    mutations: {
        initialized(state, payload) {
            state.initialized = true;

            if (payload !== null) {
                state.version = payload.version;
                state.laravel_version = payload.laravel_version;
                state.vue_version = VueVersion;
                state.vuex_version = Vuex.version;
                state.vue_router_version = payload.vue_router_version;
            }
        },
        authenticated(state, payload) {
            state.authenticated = true;
            state.user = payload;
        },
        logout(state) {
            state.authenticated = false;
            state.user = null;
        }
    },
    actions: {
        initialize({commit, state}) {
            return new Promise((resolve, reject) => {
                if (state.initialized === true) {
                    resolve(null);
                }

                axios.get('/api/info')
                    .then((response) => {commit('initialized', response.data); resolve(response)})
                    .catch((err) => {commit('initialized', null); reject(err)});
            });
        },
    }
}
