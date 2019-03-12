import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active'
});


export default router;