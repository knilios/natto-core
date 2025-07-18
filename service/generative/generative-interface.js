class GenerativeInterface {
    /**
     * @param {Array<JSON>} prompt
     * @returns {Promise<string>}
     */
    generate(prompt) {
        throw new Error("Implement generate method in subclass");
    }
}

export default GenerativeInterface;
