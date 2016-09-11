import { isNil }   from 'lodash';

import { Keyring } from './Keyring';

export class Loader {

    constructor({ store, keyring = new Keyring(), context = {} }) {

        this.store = store;
        this.keyring = keyring;
        this.context = context;

    }

    load(processor, props) {

        let lock = this.keyring.create();

        return Promise.resolve().then(() => {

            if (processor.length > 2) {
                return processor(this.store.getState(), props, this.context, (... args) => this.store.dispatch(... args));
            } else {
                return processor(props, this.context);
            }

        }).then(result => {

            lock.release();
            return result;

        }, error => {

            lock.release();
            throw error;

        });

    }

}
