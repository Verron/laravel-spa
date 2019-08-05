require('./bootstrap');

import Vue from 'vue';
import Container from './container';

const app = new Container(Vue);

app.bootstrap();
window.$app = app;

// Load Components.
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => {
    let file_parts = key.split('/');
    let name = '';
    let component_name = file_parts.pop();

    file_parts.forEach((part_name) => {
        if (part_name && part_name !== '.') {
            name += `${part_name}-`;
        }
    });

    Vue.component(`${name}${component_name.split('.')[0].toLowerCase()}`, files(key).default)
});