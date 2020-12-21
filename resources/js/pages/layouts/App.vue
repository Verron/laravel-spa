<template>
    <div class="w-100 ml-auto mr-auto">
        <nav class="bg-gray-800 sticky top-0">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <!-- Mobile Button -->
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button @click="toggleMenu()" ref="menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <!-- Icon when menu is closed. -->
                            <!--
                              Heroicon name: menu

                              Menu open: "hidden", Menu closed: "block"
                            -->
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <!-- Icon when menu is open. -->
                            <!--
                              Heroicon name: x

                              Menu open: "block", Menu closed: "hidden"
                            -->
                            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Main Nav -->
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <!-- Branding -->
                        <router-link :to="{name: 'welcome'}" class="flex-shrink-0 flex items-center">
                            <span class="block lg:hidden h-8 w-auto" alt="SPA">
                                <i class="fa fa-terminal text-indigo-400"></i>
                            </span>

                            <span class="hidden lg:block h-8 w-auto flex text-white" alt="SPA">
                                <i class="fa fa-terminal text-indigo-400 mr-2"></i>
                                <span>SPA</span>
                            </span>
                        </router-link>

                        <!-- Menu Items -->
                        <div class="hidden sm:block sm:ml-6">
                            <div class="flex space-x-4">
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <router-link :to="{name: 'home'}" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Home <span class="sr-only">(current)</span></router-link>

                                <a href="https://github.com/Verron/laravel-spa" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" target="_blank">Github</a>
                                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Example</a>
                            </div>
                        </div>
                    </div>

                    <!-- Right Menus -->
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <!-- Notifications -->
                        <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">View notifications</span>
                            <div class="h-6 w-6"><i class="far fa-bell"></i></div>
                        </button>

                        <!-- Profile dropdown -->
                        <div class="ml-3 relative" ref="dropdown">
                            <div>
                                <button @click="toggleDropdown()" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                                </button>
                            </div>
                            <!--
                              Profile dropdown panel, show/hide based on dropdown state.

                              Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                              Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            -->
                            <transition
                                enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <div v-show="dropdownVisible" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="logout">Sign out</a>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-show="menuVisible" class="sm:hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1 mobile-menu-items">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <router-link :to="{name: 'home'}" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Home <span class="sr-only">(current)</span></router-link>

                        <a href="https://github.com/Verron/laravel-spa" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" target="_blank">Github</a>
                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Example</a>
                    </div>
                </div>
            </transition>
        </nav>
        <div class="flex-initial flx-shrink-0 mt-5 flex">
            <div class="flex-1 sm:px-3">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex';
    import { computed, ref, onBeforeUnmount } from 'vue';
    import { toggleable } from "../../lib/utils/toggle";
    import { useRouter } from "vue-router";

    export default {
        setup() {
            const $store = useStore();
            const $router = useRouter();

            const dropdown = ref(null);
            const menu = ref(null);
            const {visible: dropdownVisible, toggle: toggleDropdown} = toggleable();
            const {visible: menuVisible, toggle: toggleMenu} = toggleable();

            const externalDropdownClick = ($event) => {
                if (!dropdown.value.contains($event.target)) {
                    toggleDropdown(false);
                }
            };

            window.addEventListener('click', externalDropdownClick)

            onBeforeUnmount(() => {
                window.removeEventListener('click', externalDropdownClick);
            });

            return {
                dropdown,
                menu,
                dropdownVisible,
                menuVisible,
                toggleDropdown,
                toggleMenu,
                logout() {
                    $store.dispatch('auth/logout')
                        .then(() => $router.push({name: 'login'}))
                        .catch(() => $router.push({name: 'welcome'}));


                },
                user: computed(() => $store.state.auth.user)
            };
        }
    }
</script>

<script-ignore setup>
import { useStore } from 'vuex';
import { computed, ref, onBeforeUnmount } from 'vue';
import { toggleable } from "../../lib/utils/toggle";

const store = useStore();

export const dropdown = ref(null);
export const menu = ref(null);
export const {visible: dropdownVisible, toggle: toggleDropdown} = toggleable();
export const {visible: menuVisible, toggle: toggleMenu} = toggleable();
export const user = computed(() => store.state.auth.user)

export const logout = () => {
    store.dispatch('auth/logout')
        .then(() => this.$router.push({name: 'login'}))
        .catch(() => this.$router.push({name: 'welcome'}));


};

const externalDropdownClick = ($event) => {
    if (!dropdown.value.contains($event.target)) {
        toggleDropdown(false);
    }
};

window.addEventListener('click', externalDropdownClick)

onBeforeUnmount(() => {
    window.removeEventListener('click', externalDropdownClick);
});
</script-ignore>
