export class Keyring {

    constructor(callback) {

        this.refCount = 0;
        this.callback = callback;

    }

    create() {

        let active = false;
        this.refCount += 1;

        return { release: () => {

            if (!active)
                return;

            active = false;
            this.refCount -= 1;

            if (this.refCount === 0) {
                this.callback();
            }

        } };

    }

}
