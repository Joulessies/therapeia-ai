import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are Therapeia, a compassionate AI mental health companion. You provide supportive, empathetic responses to help users with their mental health concerns.

Key principles:
- Always be supportive and non-judgmental
- Validate the user's feelings and experiences  
- Ask thoughtful follow-up questions
- Suggest healthy coping strategies when appropriate
- Encourage professional help for serious concerns
- Maintain a warm, caring tone

If someone mentions crisis situations (suicide, self-harm), immediately encourage them to contact crisis support (988 Suicide & Crisis Lifeline) or emergency services.

Respond as a caring mental health companion who truly wants to help.`;

// Available models (free models don't require API key)
const FREE_MODELS = [
  "microsoft/DialoGPT-large",
  "facebook/blenderbot-400M-distill",
  "microsoft/DialoGPT-medium",
  "gpt2",
  "distilgpt2",
];

const PREMIUM_MODELS = [
  "meta-llama/Llama-2-7b-chat-hf",
  "mistralai/Mistral-7B-Instruct-v0.1",
  "HuggingFaceH4/zephyr-7b-beta",
];

export async function POST(request) {
  try {
    // Initialize Hugging Face client only when needed
    let hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    const body = await request.json();
    const { message, conversationHistory = [], mood, analysis, apiKey } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation context
    let context = "";

    // Add mood and analysis context
    if (mood) {
      context += `The user is feeling ${mood}. `;
    }

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
    const recentHistory = conversationHistory.slice(-6);
    for (const entry of recentHistory) {
      if (entry.role === "user") {
        context += `User: ${entry.message}\n`;
      } else if (entry.role === "assistant") {
        context += `Therapeia: ${entry.message}\n`;
      }
    }

    context += `User: ${message}`;

    // Use client-provided API key if available
    if (apiKey && apiKey.startsWith("hf_")) {
      hf = new HfInference(apiKey);
    }

    // Try models in order of preference
    const modelsToTry = [
      process.env.HUGGINGFACE_MODEL || "microsoft/DialoGPT-large",
      ...FREE_MODELS,
      ...PREMIUM_MODELS,
    ];

    for (const model of modelsToTry) {
      try {
        console.log(`Trying Hugging Face model: ${model}`);

        let response;

        if (model.includes("DialoGPT")) {
          // Use conversational API for DialoGPT
          response = await hf.conversational({
            model: model,
            inputs: {
              past_user_inputs: [],
              generated_responses: [],
              text: context,
            },
            parameters: {
              temperature: 0.7,
              max_length: 200,
              do_sample: true,
              top_p: 0.9,
            },
          });

          response = response.generated_text;
        } else if (model.includes("blenderbot")) {
          // Use conversational API for BlenderBot
          response = await hf.conversational({
            model: model,
            inputs: {
              text: message,
            },
            parameters: {
              temperature: 0.7,
              max_length: 200,
            },
          });

          response = response.generated_text;
        } else if (
          model.includes("llama") ||
          model.includes("mistral") ||
          model.includes("zephyr")
        ) {
          // Use instruction format for chat models
          const prompt = `<s>[INST] ${SYSTEM_PROMPT}\n\nUser: ${context} [/INST]`;

          const result = await hf.textGeneration({
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

          response = result.generated_text.replace(prompt, "").trim();
        } else {
          // Generic text generation
          const prompt = `${SYSTEM_PROMPT}\n\nUser: ${context}\nTherapeia:`;

          const result = await hf.textGeneration({
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

          response = result.generated_text.replace(prompt, "").trim();
        }

        if (response && response.trim()) {
          // Clean up response
          let cleanResponse = response
            .replace(/^(Therapeia:|AI:|Assistant:|Bot:)/i, "")
            .replace(/^[\s\n]*/, "")
            .trim();

          // Add crisis intervention if needed
          if (analysis?.urgencyLevel === "crisis") {
            cleanResponse +=
              "\n\nI'm very concerned about what you've shared. Please consider reaching out for immediate support - you can call 988 for the Suicide & Crisis Lifeline, which is available 24/7. You don't have to go through this alone.";
          }

          // Ensure reasonable length
          if (cleanResponse.length < 20) {
            cleanResponse =
              "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what you're experiencing right now?";
          }

          if (cleanResponse.length > 500) {
            cleanResponse = cleanResponse.substring(0, 497) + "...";
          }

          return NextResponse.json({
            message: cleanResponse,
            model: model,
            type: "Hugging Face",
          });
        }
      } catch (error) {
        console.warn(`Hugging Face model ${model} failed:`, error.message);
        continue; // Try next model
      }
    }

    // All models failed, return fallback
    throw new Error("All Hugging Face models unavailable");
  } catch (error) {
    console.error("Hugging Face API Error:", error);

    // Return fallback response
    let fallbackMessage =
      "I hear you, and I want you to know that your feelings are valid. Sometimes it helps to talk about what you're experiencing. What's been on your mind lately?";

    const { analysis } = await request.json().catch(() => ({}));

    if (analysis?.urgencyLevel === "crisis") {
      fallbackMessage =
        "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis hotline immediately - call 988 for the Suicide & Crisis Lifeline. Professional help is available 24/7, and you don't have to go through this alone.";
    }

    return NextResponse.json(
      {
        error: "Hugging Face service error",
        fallback: true,
        message: fallbackMessage,
        type: "Fallback",
      },
      { status: 200 } // Return 200 so client gets the fallback message
    );
  }
}
