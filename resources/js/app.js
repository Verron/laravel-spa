require('./bootstrap');

import Vue from 'vue';
import Container from './container';

const app = new Container(Vue);

app.bootstrap();
window.$app = app;

// Load Components.
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));