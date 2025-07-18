import BaseChain from "../base-chain";

class CoreChain extends BaseChain {
    /**
     * @param {BaseChain} next
     */
    setNext(next) {
        super.setNext(next);
    }

    /**
     * @param {string} request
     * @returns {string}
     */
    handle(request) {
        super.handle(request);
    }
}

export default CoreChain;
