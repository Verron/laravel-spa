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

                axios.get('/api/user')
                    .then((response) => {
                        commit('authenticated', response.data);
                        commit('initialized');
                        resolve(response)
                    }).catch((err) => {commit('initialized'); reject(err)});
            });
        },
        login({commit, state}, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/login', credentials).then((response) => {
                    axios.get('/api/user')
                        .then((response) => {
                            commit('authenticated', response.data);
                            resolve(response);
                        }).catch((err) => {
                            reject(err);
                    });
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                axios.post('/logout').then((response) => {
                    commit('logout');
                    resolve(response);
                }).catch((err) => {
                    commit('logout');
                    reject(err);
                });
            });
        }
    }
}
