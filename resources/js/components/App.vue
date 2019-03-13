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
            this.initializeAuth().then(() => this.$store.commit('initialized')).catch(() => this.$store.commit('initialized'));
        },
        computed: {
            ...mapGetters(['initialized'])
        }
    };
</script>