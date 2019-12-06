<template>
    <div class="container-fluid">
        <nav class="navbar navbar-dark bg-dark">
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <router-link :to="{name: 'welcome'}" class="navbar-brand">SPA</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link :to="{name: 'home'}" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/Verron/laravel-spa" class="nav-link">Github</a>
                        </li>
                    </ul>
                    <form class="form-inline mt-2 mt-md-0">
                        <div class="dropdown">
                            <a class="dropdown-toggle user-name" href="#" id="userNavMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user ? user.name : '' }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userNavMenu">
                                <router-link class="dropdown-item" :to="{name: 'home'}">Dashboard</router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" @click="signOut">Logout</a>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>

        </nav>
        <div class="row mt-5">
            <div class="col">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState('auth', [
                'user'
            ])
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout',
            }),

            signOut() {
                this.logout().then(() => this.$router.push({name: 'login'})).catch(() => this.$router.push({name: 'welcome'}));
            }
        }
    };
</script>