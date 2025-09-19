/**
 * Test script for Hugging Face AI integration
 * Run this to verify the AI service is working properly
 */

import huggingFaceService from "./huggingfaceService.js";

// Test messages with different scenarios
const testMessages = [
  {
    message: "Hello, I'm feeling anxious today",
    mood: "anxious",
    analysis: {
      urgencyLevel: "normal",
      emotionalState: { primary: "anxiety" },
      therapeuticNeeds: ["anxiety_management"],
      keyTopics: [],
    },
  },
  {
    message: "I'm really struggling and don't know what to do",
    mood: "sad",
    analysis: {
      urgencyLevel: "high",
      emotionalState: { primary: "depression" },
      therapeuticNeeds: ["mood_support"],
      keyTopics: [],
    },
  },
  {
    message: "I just wanted to say hi and see how this works",
    mood: "neutral",
    analysis: {
      urgencyLevel: "normal",
      emotionalState: { primary: "neutral" },
      therapeuticNeeds: [],
      keyTopics: [],
    },
  },
];

export async function testHuggingFaceIntegration() {
  console.log("🧪 Testing Hugging Face AI Integration...\n");

  // Test service configuration
  console.log("📋 Service Status:");
  console.log("- Configured:", huggingFaceService.isConfigured());
  console.log(
    "- Status:",
    JSON.stringify(huggingFaceService.getStatus(), null, 2)
  );
  console.log(
    "- Available Models:",
    JSON.stringify(huggingFaceService.getAvailableModels(), null, 2)
  );
  console.log("\n");

  // Test responses
  for (let i = 0; i < testMessages.length; i++) {
    const test = testMessages[i];
    console.log(`🔄 Test ${i + 1}: "${test.message}"`);
    console.log(
      `   Mood: ${test.mood}, Urgency: ${test.analysis.urgencyLevel}`
    );

    try {
      const startTime = Date.now();
      const response = await huggingFaceService.generateResponse(
        test.message,
        [], // empty conversation history
        test.mood,
        test.analysis
      );
      const endTime = Date.now();

      console.log(`✅ Response (${endTime - startTime}ms):`);
      console.log(`   "${response}"`);
      console.log("\n");
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      console.log("\n");
    }
  }

  // Test API route
  console.log("🌐 Testing API Route...");
  try {
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "This is a test of the API route",
        conversationHistory: [],
        mood: "neutral",
        analysis: {
          urgencyLevel: "normal",
          emotionalState: { primary: "neutral" },
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Route working:");
      console.log(`   Model: ${data.model}`);
      console.log(`   Type: ${data.type}`);
      console.log(`   Response: "${data.message}"`);
    } else {
      console.log("⚠️ API Route returned error:", response.status);
    }
  } catch (error) {
    console.log("❌ API Route failed:", error.message);
  }

  console.log("\n🎉 Hugging Face AI Integration Test Complete!");
}

// Export for use in browser console or Node.js
if (typeof window !== "undefined") {
  window.testHuggingFace = testHuggingFaceIntegration;
}
