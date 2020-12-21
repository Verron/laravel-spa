<template>
    <app-layout>
        <div class="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Welcome, {{ user.name }}</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Application Information</p>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:py-5 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dl class="text-sm font-medium text-gray-500">SPA Version</dl>
                                <dt class="mt-1 sm:mt-0 text-gray-900 sm:col-span-2">{{ version }}</dt>
                            </div>
                            <div class="py-4 sm:py-5 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dl class="text-sm font-medium text-gray-500">Laravel Version</dl>
                                <dt class="mt-1 sm:mt-0 text-gray-900 sm:col-span-2">{{ laravel_version }}</dt>
                            </div>
                            <div class="py-4 sm:py-5 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dl class="text-sm font-medium text-gray-500">Vue Version</dl>
                                <dt class="mt-1 sm:mt-0 text-gray-900 sm:col-span-2">{{ vue_version }}</dt>
                            </div>
                            <div class="py-4 sm:py-5 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dl class="text-sm font-medium text-gray-500">VueRouter Version</dl>
                                <dt class="mt-1 sm:mt-0 text-gray-900 sm:col-span-2">{{ vue_router_version }}</dt>
                            </div>
                            <div class="py-4 sm:py-5 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dl class="text-sm font-medium text-gray-500">Vuex Version</dl>
                                <dt class="mt-1 sm:mt-0 text-gray-900 sm:col-span-2">{{ vuex_version }}</dt>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
import AppLayout from './layouts/App';
import { useStore } from 'vuex';
import { computed } from "vue";

export default {
    setup() {
        const $store = useStore();

        return {
            user: computed(() => $store.state.auth.user),
            version: computed(() => $store.state.app.version),
            vue_version: computed(() => $store.state.app.vue_version),
            laravel_version: computed(() => $store.state.app.laravel_version),
            vuex_version: computed(() => $store.state.app.vuex_version),
            vue_router_version: computed(() => $store.state.app.vue_router_version),
        };
    },
    components: {
        AppLayout,
    },
}
</script>


<script-ignore setup>
import AppLayout from './layouts/App';
import { useStore } from 'vuex';
import { computed } from "vue";

const store = useStore();

export const user = computed(() => store.state.auth.user);
export const version = computed(() => store.state.app.version);
export const vue_version = computed(() => store.state.app.vue_version);
export const laravel_version = computed(() => store.state.app.laravel_version);
export const vuex_version = computed(() => store.state.app.vuex_version);

export default {
    components: {
        AppLayout
    }
}
</script-ignore>

<style scoped>
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
