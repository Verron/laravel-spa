<template>
    <div v-cloak>
        <router-view v-if="initialized === true"></router-view>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        methods: {
            ...mapActions({
                initializeAuth: 'auth/initialize'
            })
        },
        mounted() {
        },
        computed: {
            ...mapGetters(['initialized'])
        }
    };
</script>