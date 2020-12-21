<template>
    <master-layout>
        <div class="flex p-10 md:p-0 md:justify-center items-center -mt-5 h-screen">
            <div class="flex-1 md:flex-initial md:flex-shrink-0" style="min-width: 400px;">
                <h1 class="text-center title mb-5">Laravel SPA</h1>
                <form class="" @submit.prevent="signIn({email, password, remember})">
                    <div class="mb-3">
                        <label for="sign_in_email" class="sr-only">Email address</label>
                        <input type="email" v-model="email"
                               class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                               :class="{'is-invalid': hasError('email')}" id="sign_in_email" placeholder="Enter email">
                        <div class="invalid-feedback" v-if="hasError('email')">
                            {{ getError('email') }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="sign_in_password" class="sr-only">Password</label>
                        <input type="password" v-model="password"
                               class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                               id="sign_in_password"
                               placeholder="Password">
                    </div>
                    <div class="mb-3 relative flex items-start">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="remember"
                                   class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                   id="sign_in_remember_me">
                        </div>
                        <div class="ml-3 text-sm">
                            <label class="font-medium text-gray-700" for="sign_in_remember_me">Remember Me</label>
                        </div>
                    </div>
                    <button type="submit"
                            class="block w-full items-center text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
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
