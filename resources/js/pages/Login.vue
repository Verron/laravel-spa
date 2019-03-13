<template>
    <master-layout>
        <div class="row justify-content-md-center align-content-center mt-n5" style="height: 100vh;">
            <div class="col-md-auto" style="min-width: 400px;">
                <h1 class="text-center title m-b-md">Laravel SPA</h1>
                <form @submit.prevent="signIn({email, password, remember})">
                    <div class="form-group">
                        <label for="sign_in_email" class="sr-only">Email address</label>
                        <input type="email" v-model="email" class="form-control" id="sign_in_email"placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="sign_in_password" class="sr-only">Password</label>
                        <input type="password" v-model="password" class="form-control" id="sign_in_password" placeholder="Password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" v-model="remember" class="form-check-input" id="sign_in_remember_me">
                        <label class="form-check-label" for="sign_in_remember_me">Remember Me</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>
            </div>
        </div>
    </master-layout>
</template>

<script>
    import MasterLayout from './layouts/Master';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                email: null,
                password: null,
                remember: null,
            };
        },
        components: {
            MasterLayout
        },
        methods: {
            ...mapActions({
                login: 'auth/login',
            }),
            signIn(credentials) {
                this.login(credentials).then(() => {
                    this.$router.push({name: 'home'});
                });
            }
        },
        mounted() {}
    }
</script>

<style scoped>
    .title {
        font-size: 84px;
    }

    .m-b-md {
        margin-bottom: 30px;
    }
</style>