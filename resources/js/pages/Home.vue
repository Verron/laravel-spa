<template>
    <app-layout>
        <div class="card">
            <h4 class="card-header">Home</h4>
            <div class="card-body">
                <h5 class="card-title" v-if="user">
                    Welcome, {{ user ? user.name : '' }}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    You are logged in!
                </h6>
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
            ])
        },
    }
</script>