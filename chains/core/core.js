import BaseChain from "../base-chain";
import GenerativeInterfaces from "../../service/generative/generative-interface";

const SUMMARIZE_MAX_CONVERSATION_LENGTH = 7;

class CoreChain extends BaseChain {
    /**
     * @param {mainGenerativeService} generativeService The initialized generative service instance.
     * @param {SummarizerService} generativeService The initialized summarizer service instance.
     * @param {String} personalContext A string containing the personality and purpose of the AI.
     * @throws {Error} If generativeService is not an instance of GenerativeInterfaces
     */
    constructor(
        mainGenerativeService,
        summarizerService,
        personalContext,
        summarizerContext
    ) {
        super();
        if (!(mainGenerativeService instanceof GenerativeInterfaces)) {
            throw new Error("Invalid generative service instance.");
        }
        if (!(summarizerService instanceof GenerativeInterfaces)) {
            throw new Error("Invalid summarizer service instance.");
        }
        if (typeof personalContext !== "string" || personalContext.trim() === "") {
            throw new Error("Personal context must be a non-empty string.");
        }
        if (typeof summarizerContext !== "string" || summarizerContext.trim() === "") {
            throw new Error("Summarizer context must be a non-empty string.");
        }
        this.generativeService = mainGenerativeService;
        this.summarizerService = summarizerService;
        this.personalContext = personalContext;
        this.summarizerContext = summarizerContext;
        this.cachedConversation = [];
    }

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
    async handle(request) {
        super.handle(request);
        const response = await this.generativeService.generate(this.#generateRequest(request));
        // Add the response to the cached conversation
        this.cachedConversation.push({
            role: "assistant",
            content: response
        });
        // If the conversation exceeds the maximum length, summarize it
        if (this.cachedConversation.length >= SUMMARIZE_MAX_CONVERSATION_LENGTH) {
            this.#sumarize();
        }
        return response;
    }

    /**
     * Summarizes the cached conversation and resets it.
     * @private
     * @returns {void}
    */
    #sumarize() {
        const summaryRequest = [
            {
                role: "system",
                content: this.summarizerContext,
            },
            {
                role: "user",
                content: this.cachedConversation.map(msg => msg.content).join("\n")
            }
        ];
        const summary = this.summarizerService.generate(summaryRequest);
        this.cachedConversation = [
            {
                role: "assistant",
                content: `system: The summarized context => ${summary}`
            }
        ];
    }

    /**
     * Generates the request for the generative service.
     * @private
     * @param {string} request The user request.
     * @returns {Array} The formatted request array.
     */
    #generateRequest(request) {
        return [
            {
                role: "system",
                content: this.personalContext,
            },
            ...this.cachedConversation,
            {
                role: "user",
                content: request,
            }
        ];
    }
}

export default CoreChain;
