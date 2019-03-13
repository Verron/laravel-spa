// Private methods can go here

export const store = {
    namespaced: true,
    strict: true,
    state: {
        initialized: false,
        user: null,
        authenticated: false,
    },
    getters: {
        guest(state) {
            return state.authenticated === false;
        }
    },
    mutations: {
        initialized(state) {
            state.initialized = true;
        }
    },
    actions: {
        initialize({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/api/user')
                    .then((response) => {commit('initialized'); resolve(response)})
                    .catch((err) => {commit('initialized'); reject(err)});
            });
        },
        login({commit, state}, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/login', credentials).then((response) => {
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    }
}