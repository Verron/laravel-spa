<template>
    <master-layout>
        <div class="row justify-content-md-center align-content-center mt-n5" style="height: 100vh;">
            <div class="col-md-auto" style="min-width: 400px;">
                <h1 class="text-center title m-b-md">Laravel SPA</h1>
                <form class="" @submit.prevent="signIn({email, password, remember})">
                    <div class="form-group">
                        <label for="sign_in_email" class="sr-only">Email address</label>
                        <input type="email" v-model="email" class="form-control"
                               :class="{'is-invalid': hasError('email')}" id="sign_in_email" placeholder="Enter email">
                        <div class="invalid-feedback" v-if="hasError('email')">
                            {{ getError('email') }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sign_in_password" class="sr-only">Password</label>
                        <input type="password" v-model="password" class="form-control" id="sign_in_password"
                               placeholder="Password">
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
                errors: {},
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
                }).catch((err) => {
                    console.log(err.response, err.response);
                    if (err.response && err.response.status === 422) {
                        this.errors = err.response.data.errors;
                    }
                });
            },
            getError(field) {
                if (this.errors.hasOwnProperty(field)) {
                    return this.errors[field][0];
                }
                return '';
            },
            hasError(field) {
                return this.errors.hasOwnProperty(field);
            }
        },
        mounted() {
        }
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