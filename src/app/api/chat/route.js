import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client on server-side (more secure)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Therapeia, a compassionate and professional AI mental health companion. Your role is to provide supportive, empathetic, and therapeutic responses to users seeking mental health support.

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

export async function POST(request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API not configured",
          fallback: true,
          message:
            "I apologize, but the AI service is not properly configured. Please contact support or try again later.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory = [], mood, analysis } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build messages for OpenAI
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];

    // Add context about user's current state if available
    if (mood || analysis) {
      let contextInfo = [];

      if (mood) {
        contextInfo.push(`User's current mood: ${mood}`);
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

    // Add recent conversation history (last 10 messages)
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
    let currentMessage = message;
    if (mood) {
      currentMessage += ` [Current mood: ${mood}]`;
    }

    messages.push({
      role: "user",
      content: currentMessage,
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
      messages: messages,
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response generated from OpenAI");
    }

    return NextResponse.json({
      message: aiResponse.trim(),
      model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
      usage: completion.usage,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Return appropriate error responses
    let errorMessage =
      "I'm experiencing some technical difficulties right now, but your message is important to me. Please try again, and if this continues, I encourage you to reach out to a mental health professional who can provide the support you need.";

    if (error.code === "insufficient_quota") {
      errorMessage =
        "I apologize, but I'm currently experiencing high demand. Please try again in a few moments, or consider reaching out to a human counselor if you need immediate support.";
    } else if (error.code === "rate_limit_exceeded") {
      errorMessage =
        "I'm receiving many requests right now. Please wait a moment before sending your next message. Your mental health is important, and I want to give you the attention you deserve.";
    }

    return NextResponse.json(
      {
        error: "AI service error",
        fallback: true,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
