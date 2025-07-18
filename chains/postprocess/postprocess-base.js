import BaseChain from "../base-chain";

/**
 * This class serves as a base for other post-processing chains.
 * @class PostprocessBase
 * @extends BaseChain
 */
class PostprocessBase extends BaseChain {
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

export default PostprocessBase;