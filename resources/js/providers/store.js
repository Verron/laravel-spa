import { Provider } from '../lib/support/provider';

export class Store extends Provider {
    register() {
        this.app.bind('store', require('../store').store, true);
    }
}
