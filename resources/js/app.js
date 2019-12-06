require('./bootstrap');

import Vue from 'vue';
import Container from './container';

const app = new Container(Vue);

app.bootstrap();
window.$app = app;