import OpenAI from "openai";

/**
 * OpenAI Service for Therapeia AI
 * Handles real AI conversations using OpenAI's GPT models
 */
class OpenAIService {
  constructor() {
    // Use API route for secure server-side calls
    this.useAPIRoute = true;

    // Fallback client for direct calls (only if API route fails)
    this.client = null;
    if (typeof window !== "undefined" && process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
    }

    // Configuration
    this.model = process.env.OPENAI_MODEL || "gpt-4-turbo-preview";
    this.maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 1000;
    this.temperature = parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7;

    // System prompt for therapeutic AI
    this.systemPrompt = `You are Therapeia, a compassionate and professional AI mental health companion. Your role is to provide supportive, empathetic, and therapeutic responses to users seeking mental health support.

CORE PRINCIPLES:
- Always prioritize user safety and well-being
- Provide empathetic, non-judgmental responses
- Use evidence-based therapeutic techniques when appropriate
- Encourage professional help when needed
- Maintain appropriate boundaries as an AI companion

THERAPEUTIC APPROACH:
- Use active listening techniques
- Ask open-ended questions to encourage reflection
- Validate emotions and experiences
- Offer coping strategies and techniques when appropriate
- Use cognitive-behavioral therapy (CBT) principles
- Practice motivational interviewing techniques

CRISIS PROTOCOL:
- If user mentions suicide, self-harm, or crisis situations, immediately:
  1. Express concern and validate their pain
  2. Encourage immediate professional help
  3. Provide crisis resources (988 Suicide & Crisis Lifeline)
  4. Emphasize that help is available and things can improve

RESPONSE STYLE:
- Warm, professional, and supportive tone
- Use "I" statements to show engagement ("I hear that...", "I understand...")
- Keep responses conversational but therapeutic
- Avoid being overly clinical or robotic
- Match the user's emotional tone appropriately

BOUNDARIES:
- You are an AI companion, not a replacement for professional therapy
- Cannot diagnose mental health conditions
- Cannot prescribe medications
- Encourage professional help for serious concerns
- Maintain confidentiality within the conversation

Remember: Your goal is to provide a safe, supportive space for users to explore their thoughts and feelings while encouraging appropriate professional help when needed.`;
  }

  /**
   * Generate AI response using OpenAI GPT
   */
  async generateResponse(
    userMessage,
    conversationHistory = [],
    userMood = null,
    analysis = null
  ) {
    // Try API route first (recommended for production)
    if (this.useAPIRoute) {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: conversationHistory,
            mood: userMood,
            analysis: analysis,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          return data.message;
        } else if (data.fallback) {
          // API route returned a fallback message
          return data.message;
        } else {
          throw new Error(data.error || "API route error");
        }
      } catch (error) {
        console.error("API route error, trying direct client:", error);
        // Fall through to direct client if API route fails
      }
    }

    // Fallback to direct client (less secure, for development)
    if (this.client) {
      try {
        // Build conversation messages
        const messages = this.buildMessages(
          userMessage,
          conversationHistory,
          userMood,
          analysis
        );

        // Call OpenAI API directly
        const response = await this.client.chat.completions.create({
          model: this.model,
          messages: messages,
          max_tokens: this.maxTokens,
          temperature: this.temperature,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        });

        const aiResponse = response.choices[0]?.message?.content;

        if (!aiResponse) {
          throw new Error("No response generated from OpenAI");
        }

        return aiResponse.trim();
      } catch (error) {
        console.error("Direct OpenAI API Error:", error);

        // Return appropriate fallback based on error type
        if (error.code === "insufficient_quota") {
          return "I apologize, but I'm currently experiencing high demand. Please try again in a few moments, or consider reaching out to a human counselor if you need immediate support.";
        }

        if (error.code === "rate_limit_exceeded") {
          return "I'm receiving many requests right now. Please wait a moment before sending your next message. Your mental health is important, and I want to give you the attention you deserve.";
        }

        // Generic fallback
        return "I'm experiencing some technical difficulties right now, but your message is important to me. Please try again, and if this continues, I encourage you to reach out to a mental health professional who can provide the support you need.";
      }
    }

    // No OpenAI access available
    throw new Error("OpenAI service not available");
  }

  /**
   * Build conversation messages for OpenAI API
   */
  buildMessages(userMessage, conversationHistory, userMood, analysis) {
    const messages = [
      {
        role: "system",
        content: this.systemPrompt,
      },
    ];

    // Add context about user's current state if available
    if (userMood || analysis) {
      let contextInfo = [];

      if (userMood) {
        contextInfo.push(`User's current mood: ${userMood}`);
      }

      if (analysis) {
        if (analysis.urgencyLevel === "crisis") {
          contextInfo.push(
            "URGENT: This message may indicate a crisis situation. Prioritize safety and crisis resources."
          );
        } else if (analysis.urgencyLevel === "high") {
          contextInfo.push("This message indicates high emotional distress.");
        }

        if (analysis.emotionalState?.primary) {
          contextInfo.push(
            `Primary emotional state detected: ${analysis.emotionalState.primary}`
          );
        }

        if (analysis.therapeuticNeeds?.length > 0) {
          contextInfo.push(
            `Therapeutic needs identified: ${analysis.therapeuticNeeds.join(
              ", "
            )}`
          );
        }

        if (analysis.keyTopics?.length > 0) {
          contextInfo.push(`Key topics: ${analysis.keyTopics.join(", ")}`);
        }
      }

      if (contextInfo.length > 0) {
        messages.push({
          role: "system",
          content: `Context for this conversation: ${contextInfo.join(" | ")}`,
        });
      }
    }

    // Add recent conversation history (last 10 messages to stay within token limits)
    const recentHistory = conversationHistory.slice(-10);

    for (const entry of recentHistory) {
      if (entry.role === "user") {
        let content = entry.message;
        if (entry.mood) {
          content += ` [User mood: ${entry.mood}]`;
        }
        messages.push({
          role: "user",
          content: content,
        });
      } else if (entry.role === "assistant") {
        messages.push({
          role: "assistant",
          content: entry.message,
        });
      }
    }

    // Add current user message
    let currentMessage = userMessage;
    if (userMood) {
      currentMessage += ` [Current mood: ${userMood}]`;
    }

    messages.push({
      role: "user",
      content: currentMessage,
    });

    return messages;
  }

  /**
   * Check if OpenAI service is properly configured
   */
  isConfigured() {
    // Check if we can use API route or have direct client access
    return this.useAPIRoute || !!process.env.OPENAI_API_KEY;
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      configured: this.isConfigured(),
      model: this.model,
      maxTokens: this.maxTokens,
      temperature: this.temperature,
    };
  }
}

// Export singleton instance
const openAIService = new OpenAIService();
export default openAIService;
