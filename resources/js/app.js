require('./bootstrap');

import Container from './container';

const app = new Container();

app.bootstrap();
window.$app = app;
