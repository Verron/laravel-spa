import { Route as RouteServiceProvider } from '../lib/router/provider';

export class Route extends RouteServiceProvider {
    register() {
        super.register();

        // Load Routes
        require('../routes')(this.router);
    }

    boot() {

    }
}
