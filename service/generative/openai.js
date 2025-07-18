import OpenAI from "openai";
import GenerativeInterfaces from "./generative-interface";

class OpenAIGenerative extends GenerativeInterfaces {
    constructor(apiKey, model, temperature, maxTokens) {
        super();
        if (!apiKey) {
            throw new Error("API key is required for OpenAI.");
        }
        // Check if model is a string and not empty
        if (typeof model !== "string" || model.trim() === "") {
            throw new Error("Model must be a non-empty string.");
        }
        // Check if temperature is a number between 0 and 1
        if (temperature !== undefined && (typeof temperature !== "number" || temperature < 0 || temperature > 1)) {
            throw new Error("Temperature must be a number between 0 and 1.");
        }
        // Check if maxTokens is a positive integer
        if (maxTokens !== undefined && (typeof maxTokens !== "number" || maxTokens <= 0)) {
            throw new Error("Max tokens must be a positive integer.");
        }
        this.client = new OpenAI({ apiKey });
        this.model = model;
        this.temperature = temperature;
        this.maxTokens = maxTokens;
    }
    
    /**
     * @param {Array<JSON>} prompt
     * @returns {Promise<string>}
     */
    async generate(prompt) {
        if (!Array.isArray(prompt) || prompt.length === 0) {
            throw new Error("Prompt must be a non-empty array.");
        }
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: prompt,
                temperature: this.temperature,
                max_tokens: this.maxTokens,
            });
            return response.choices[0].message.content;
        } catch (error) {
            throw new Error(`OpenAI API error: ${error.message}`);
        }
    }
}

export default OpenAIGenerative;