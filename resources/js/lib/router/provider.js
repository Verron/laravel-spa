import { Provider } from '../support/provider';
import Router from '../router';

export class Route extends Provider {
    register() {
        this.router = new Router(this.app);
        this.app.singleton('router', this.router);
    }
}
