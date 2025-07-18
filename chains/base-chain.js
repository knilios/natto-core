import ChainInterface from "./chain-interface";

class BaseChain extends ChainInterface {
    /**
     * @param {ChainInterface} next
     */
    setNext(next) {
        // Check if next is an instance of ChainInterface
        if (!(next instanceof ChainInterface)) {
            throw new Error("Next must be an instance of ChainInterface");
        }
        this.next = next;
    }

    /**
     * @param {string} request
     * @returns {string}
     */
    handle(request) {
        // Checks if request is a string
        if (typeof request !== "string") throw new Error("Request must be a string.");
        if (this.next) {
            return this.next.handle(request);
        }
        return "Request not handled";
    }
}

export default BaseChain;
