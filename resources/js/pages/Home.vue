<template>
    <app-layout>
        <div class="card">
            <h4 class="card-header">Home</h4>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title" v-if="user">
                            Welcome, {{ user ? user.name : '' }}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            You are logged in!
                        </h6>
                    </div>
                    <div class="col">
                        <h5>Application Versions</h5>
                        <dl class="dashboard-versions">
                            <dt>SPA Version</dt>
                            <dd>{{ version }}</dd>
                            <dt>Laravel Version</dt>
                            <dd>{{ laravel_version }}</dd>
                            <dt>Vue Version</dt>
                            <dd>{{ vue_version }}</dd>
                            <dt>Vuex Version</dt>
                            <dd>{{ vuex_version }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from './layouts/App';
    import { mapState } from 'vuex';

    export default {
        components: {
            AppLayout,
        },
        computed: {
            ...mapState('auth', [
                'user'
            ]),
            ...mapState('app', [
                'version',
                'vue_version',
                'laravel_version',
                'vuex_version',
            ])
        },
    }
</script>

<style lang="scss" scoped>
    .dashboard-versions {
        dt {
            float: left;
            padding-left: 10px;
        }
        dd {
            margin-left: 130px;
        }
    }

</style>