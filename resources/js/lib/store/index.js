import { Store } from 'vuex';

const checkInitialized = [
    'auth',
];

export const store = new Store({
    state: {
        initialized: false,
        loading: false,
    },
    getters: {
        initialized(state, param, param2, param3) {
            console.log('state', state, param, param2, param2);

            for (let c in checkInitialized) {
                if (state[checkInitialized[c]].initialized !== true) {
                    return false;
                }
            }

            return state.initialized === true;
        }
    },
    mutations: {
        initialized(state) {
            state.initialized = true;
        }
    },
    modules: require('./modules').registrar,
});