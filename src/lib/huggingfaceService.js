import { HfInference } from "@huggingface/inference";

/**
 * Hugging Face Service for Therapeia AI
 * Uses free Hugging Face models for AI conversations
 * No API key required for many models!
 */
class HuggingFaceService {
  constructor() {
    // Initialize Hugging Face client lazily
    this.hf = null;

    // Available free models (no API key required)
    this.freeModels = [
      "microsoft/DialoGPT-large", // Conversational AI
      "facebook/blenderbot-400M-distill", // Conversational AI
      "microsoft/DialoGPT-medium", // Smaller, faster
      "gpt2", // Classic GPT-2
      "distilgpt2", // Lighter GPT-2
    ];

    // Premium models (require API key)
    this.premiumModels = [
      "meta-llama/Llama-2-7b-chat-hf", // Llama 2 Chat
      "mistralai/Mistral-7B-Instruct-v0.1", // Mistral Instruct
      "HuggingFaceH4/zephyr-7b-beta", // Zephyr Chat
    ];

    // Default model selection
    this.currentModel =
      process.env.HUGGINGFACE_MODEL || "microsoft/DialoGPT-large";

    // Therapeutic system prompt
    this.systemPrompt = `You are Therapeia, a compassionate AI mental health companion. You provide supportive, empathetic responses to help users with their mental health concerns.

Key principles:
- Always be supportive and non-judgmental
- Validate the user's feelings and experiences
- Ask thoughtful follow-up questions
- Suggest healthy coping strategies when appropriate
- Encourage professional help for serious concerns
- Maintain a warm, caring tone

If someone mentions crisis situations (suicide, self-harm), immediately encourage them to contact crisis support (988 Suicide & Crisis Lifeline) or emergency services.

Respond as a caring mental health companion who truly wants to help.`;
  }

  /**
   * Initialize Hugging Face client when needed
   */
  initializeClient() {
    if (!this.hf) {
      this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    }
  }

  /**
   * Generate AI response using Hugging Face models via API route
   */
  async generateResponse(
    userMessage,
    conversationHistory = [],
    userMood = null,
    analysis = null
  ) {
    // Try API route first (recommended for reliability)
    try {
      // Get API key from localStorage if available
      const apiKey =
        typeof window !== "undefined"
          ? localStorage.getItem("huggingface_api_key")
          : null;

      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          mood: userMood,
          analysis: analysis,
          apiKey: apiKey, // Include API key if available
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.message;
      } else if (data.fallback) {
        // API route returned a fallback message
        return data.message;
      } else {
        throw new Error(data.error || "Hugging Face API route error");
      }
    } catch (error) {
      console.error(
        "Hugging Face API route error, trying direct client:",
        error
      );

      // Fallback to direct client calls
      return this.generateResponseDirect(
        userMessage,
        conversationHistory,
        userMood,
        analysis
      );
    }
  }

  /**
   * Direct client generation (fallback)
   */
  async generateResponseDirect(
    userMessage,
    conversationHistory = [],
    userMood = null,
    analysis = null
  ) {
    try {
      // Initialize client if needed
      this.initializeClient();
      // Build conversation context
      const conversationText = this.buildConversationText(
        userMessage,
        conversationHistory,
        userMood,
        analysis
      );

      // Try different models in order of preference
      const modelsToTry = [
        this.currentModel,
        ...this.freeModels.filter((model) => model !== this.currentModel),
        ...this.premiumModels,
      ];

      for (const model of modelsToTry) {
        try {
          console.log(`Trying model: ${model}`);

          const response = await this.callModel(
            model,
            conversationText,
            userMessage
          );

          if (response && response.trim()) {
            // Post-process the response for better therapeutic quality
            return this.enhanceResponse(response.trim(), analysis);
          }
        } catch (error) {
          console.warn(`Model ${model} failed:`, error.message);
          continue; // Try next model
        }
      }

      // If all models fail, return fallback
      throw new Error("All Hugging Face models unavailable");
    } catch (error) {
      console.error("Hugging Face direct API Error:", error);
      return this.getFallbackResponse(analysis, userMessage);
    }
  }

  /**
   * Call specific Hugging Face model
   */
  async callModel(model, conversationText, userMessage) {
    // Different models have different interfaces
    if (model.includes("DialoGPT")) {
      return await this.callDialoGPT(model, conversationText);
    } else if (model.includes("blenderbot")) {
      return await this.callBlenderBot(model, userMessage);
    } else if (
      model.includes("llama") ||
      model.includes("mistral") ||
      model.includes("zephyr")
    ) {
      return await this.callInstructModel(model, conversationText);
    } else {
      return await this.callGenericModel(model, conversationText);
    }
  }

  /**
   * Call DialoGPT models
   */
  async callDialoGPT(model, conversationText) {
    const response = await this.hf.conversational({
      model: model,
      inputs: {
        past_user_inputs: [],
        generated_responses: [],
        text: conversationText,
      },
      parameters: {
        temperature: 0.7,
        max_length: 200,
        do_sample: true,
        top_p: 0.9,
      },
    });

    return response.generated_text;
  }

  /**
   * Call BlenderBot models
   */
  async callBlenderBot(model, userMessage) {
    const response = await this.hf.conversational({
      model: model,
      inputs: {
        text: userMessage,
      },
      parameters: {
        temperature: 0.7,
        max_length: 200,
      },
    });

    return response.generated_text;
  }

  /**
   * Call instruction-following models (Llama, Mistral, etc.)
   */
  async callInstructModel(model, conversationText) {
    const prompt = `<s>[INST] ${this.systemPrompt}

User: ${conversationText} [/INST]`;

    const response = await this.hf.textGeneration({
      model: model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    });

    return response.generated_text.replace(prompt, "").trim();
  }

  /**
   * Call generic text generation models
   */
  async callGenericModel(model, conversationText) {
    const prompt = `${this.systemPrompt}\n\nUser: ${conversationText}\nTherapeia:`;

    const response = await this.hf.textGeneration({
      model: model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.8,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1,
        stop: ["User:", "\n\n"],
      },
    });

    return response.generated_text.replace(prompt, "").trim();
  }

  /**
   * Build conversation text from history
   */
  buildConversationText(userMessage, conversationHistory, userMood, analysis) {
    let context = "";

    // Add mood context
    if (userMood) {
      context += `The user is feeling ${userMood}. `;
    }

    // Add analysis context
    if (analysis?.urgencyLevel === "crisis") {
      context +=
        "URGENT: The user may be in crisis. Prioritize safety and encourage professional help. ";
    } else if (analysis?.urgencyLevel === "high") {
      context += "The user is in significant distress. ";
    }

    if (analysis?.emotionalState?.primary) {
      context += `Primary emotion: ${analysis.emotionalState.primary}. `;
    }

    // Add recent conversation history
    const recentHistory = conversationHistory.slice(-6); // Last 3 exchanges
    for (const entry of recentHistory) {
      if (entry.role === "user") {
        context += `User: ${entry.message}\n`;
      } else if (entry.role === "assistant") {
        context += `Therapeia: ${entry.message}\n`;
      }
    }

    // Add current message
    context += `User: ${userMessage}`;

    return context;
  }

  /**
   * Enhance AI response for better therapeutic quality
   */
  enhanceResponse(response, analysis) {
    // Remove any unwanted prefixes
    let enhanced = response
      .replace(/^(Therapeia:|AI:|Assistant:|Bot:)/i, "")
      .replace(/^[\s\n]*/, "")
      .trim();

    // Add crisis intervention if needed
    if (analysis?.urgencyLevel === "crisis") {
      enhanced +=
        "\n\nI'm very concerned about what you've shared. Please consider reaching out for immediate support - you can call 988 for the Suicide & Crisis Lifeline, which is available 24/7. You don't have to go through this alone.";
    }

    // Ensure response isn't too short
    if (enhanced.length < 20) {
      enhanced =
        "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what you're experiencing right now?";
    }

    // Ensure response isn't too long
    if (enhanced.length > 500) {
      enhanced = enhanced.substring(0, 497) + "...";
    }

    return enhanced;
  }

  /**
   * Get fallback response when AI models fail
   */
  getFallbackResponse(analysis, userMessage) {
    const fallbacks = [
      "I hear you, and I want you to know that your feelings are valid. Sometimes it helps to talk about what you're experiencing. What's been on your mind lately?",
      "Thank you for sharing with me. It takes courage to open up about difficult feelings. How are you taking care of yourself today?",
      "I can sense this is important to you. Your mental health matters, and I'm here to listen. What would be most helpful to talk about right now?",
      "I appreciate you reaching out. Sometimes just expressing our thoughts can bring some relief. What's been weighing on your heart?",
    ];

    if (analysis?.urgencyLevel === "crisis") {
      return "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis hotline immediately - call 988 for the Suicide & Crisis Lifeline. Professional help is available 24/7, and you don't have to go through this alone.";
    }

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  /**
   * Check if service is configured (always true for free models)
   */
  isConfigured() {
    return true; // Free models don't require API keys
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      configured: true,
      model: this.currentModel,
      type: "Hugging Face",
      apiKeyRequired: false,
      freeModels: this.freeModels,
      premiumModels: this.premiumModels,
    };
  }

  /**
   * Get available models
   */
  getAvailableModels() {
    return {
      free: this.freeModels,
      premium: this.premiumModels,
      current: this.currentModel,
    };
  }
}

// Export singleton instance
const huggingFaceService = new HuggingFaceService();
export default huggingFaceService;
