const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPEN_AI_API_BASE_URL = 'https://api.openai.com/v1'
const COMPLETIONS_ENDPOINT = '/completions'
const GPT3_MODEL = 'text-davinci-003'
const CHARS_PER_TOKEN = 4;
const MAX_PROMPT_TOKENS = 2048
const MAX_PROMPT_CHARS = MAX_PROMPT_TOKENS * CHARS_PER_TOKEN
const MAX_RESPONSE_LENGTH = 2048

class GPT3 {
    #openAiApiClient;

    constructor() {
        this.#openAiApiClient = axios.create({
            baseURL: OPEN_AI_API_BASE_URL,
            timeout: 60000,
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
        });
    }

    #validatePromptLength(prompt) {
        const promptLength = prompt.length;
        const promptTokens = promptLength / CHARS_PER_TOKEN;
        if (promptTokens >= MAX_PROMPT_TOKENS) {
            throw new Error(`Prompt is too long. Remove ${promptLength - MAX_PROMPT_CHARS} chars.`)
        }
    }

    async prompt(text) {
        try {
            this.#validatePromptLength(text);
            let response = await this.#openAiApiClient.post(COMPLETIONS_ENDPOINT, {
                model: GPT3_MODEL,
                prompt: text,
                max_tokens: MAX_RESPONSE_LENGTH,
                temperature: 0.7,
                // n: 1,
                // stream: false,
                // stop: "[PROMPT_END]"
            });
            console.log(`[GPT3]---> Total request&response used tokens: ${response.data.usage.total_tokens}`);
            return response.data.choices[0]?.text;
        } catch (error) {
            if (error.response.data) {
                throw new Error(JSON.stringify(error.response.data))
            }
            throw new Error(error.message)
        }
    }
}

module.exports = GPT3;