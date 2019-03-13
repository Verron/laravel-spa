import { middleware as auth } from './lib/router/middleware/auth';
import { middleware as guest } from './lib/router/middleware/guest';

const middleware = {
    'auth': auth,
    'guest': guest,
};

export default middleware;