import { Store } from 'vuex';

const initializeList = [
    'auth',
    'app',
];

export const store = new Store({
    state: {
        initialized: false,
        loading: false,
    },
    getters: {
        initialized(state) {
            for (let c in initializeList) {
                if (state[initializeList[c]].initialized !== true) {
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
    actions: {
        async initialize({commit, state, getters, dispatch}) {
            if (getters.initialized !== true) {
                for (let c in initializeList) {
                    if (state[initializeList[c]].initialized !== true) {
                        try {
                            await dispatch(`${initializeList[c]}/initialize`);
                        } catch (err) {
                            if (err.response && err.response.status === 401) {
                                // Do something to better explain. Maybe an alert?

                            } else {
                                throw err;
                            }
                        }
                    }
                }

                if (state.initialized === false) {
                    commit('initialized');
                }
            }
        }
    },
    modules: require('./modules').registrar,
});