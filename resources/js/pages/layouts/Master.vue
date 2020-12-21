<template>
    <div class="w-100 h-100">
        <div class="top-right links">
            <slot name="nav-links">
                <router-link :to="{name: 'welcome'}">Welcome</router-link>
            </slot>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
    html, body {
        background-color: #fff;
        color: #636b6f;
        font-family: 'Nunito', sans-serif;
        font-weight: 200;
        height: 100vh;
        margin: 0;
    }

    .full-height {
        height: 100vh;
    }

    .top-right {
        position: absolute;
        right: 10px;
        top: 18px;
    }
    .links > a {
        color: #636b6f;
        padding: 0 25px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }
</style>
