class ChainInterface {
    /**
     * 
     * @param {ChainInterface} next 
     */
    setNext(next) {
        throw new Error("Implement setNext method in subclass");
    }

    /**
     * 
     * @param {string} request 
     * @returns {string}
     */
    handle(request) {
        throw new Error("Implement handle method in subclass");
    }
}

export default ChainInterface;