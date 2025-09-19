import { useState, useCallback, useRef } from "react";
import therapyAI from "@/lib/aiService";

/**
 * Custom hook for managing AI therapy conversations
 */
export const useTherapyAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const conversationHistoryRef = useRef([]);

  /**
   * Generate AI response for user message
   */
  const generateResponse = useCallback(async (userMessage, mood = null) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message to history
      const userEntry = {
        role: "user",
        message: userMessage,
        mood: mood,
        timestamp: new Date(),
      };
      conversationHistoryRef.current.push(userEntry);

      // Generate AI response
      const aiResponse = await therapyAI.generateResponse(
        userMessage,
        mood,
        conversationHistoryRef.current
      );

      // Add AI response to history
      const aiEntry = {
        role: "assistant",
        message: aiResponse,
        timestamp: new Date(),
      };
      conversationHistoryRef.current.push(aiEntry);

      setIsLoading(false);
      return aiResponse;
    } catch (err) {
      console.error("AI Response Error:", err);
      setError(
        "I apologize, but I'm having trouble processing your message right now. Please try again in a moment."
      );
      setIsLoading(false);

      // Return fallback response
      return "I'm sorry, I'm experiencing some technical difficulties right now. Your message is important to me, and I want to give you the support you deserve. Please try sending your message again, or if this continues, consider reaching out to a human counselor.";
    }
  }, []);

  /**
   * Get session summary from AI service
   */
  const getSessionSummary = useCallback(() => {
    return therapyAI.getSessionSummary();
  }, []);

  /**
   * Reset conversation session
   */
  const resetSession = useCallback(() => {
    therapyAI.resetSession();
    conversationHistoryRef.current = [];
    setError(null);
  }, []);

  /**
   * Get conversation history
   */
  const getConversationHistory = useCallback(() => {
    return conversationHistoryRef.current;
  }, []);

  /**
   * Check if message might indicate crisis
   */
  const checkForCrisis = useCallback((message) => {
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "want to die",
      "hurt myself",
      "self harm",
      "cutting",
      "overdose",
      "can't go on",
      "no point",
    ];

    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some((keyword) => lowerMessage.includes(keyword));
  }, []);

  /**
   * Get therapeutic recommendations based on conversation
   */
  const getRecommendations = useCallback(() => {
    const summary = therapyAI.getSessionSummary();
    const recommendations = [];

    // Mood-based recommendations
    if (summary.mood === "anxious") {
      recommendations.push({
        type: "exercise",
        title: "Breathing Exercise",
        description: "Try the 4-7-8 breathing technique to reduce anxiety",
        action: "Start Exercise",
      });
    }

    if (summary.mood === "sad") {
      recommendations.push({
        type: "activity",
        title: "Mood Booster",
        description: "Consider a small activity that usually brings you joy",
        action: "View Ideas",
      });
    }

    // Topic-based recommendations
    if (summary.topics.some((topic) => topic.includes("sleep"))) {
      recommendations.push({
        type: "resource",
        title: "Sleep Hygiene",
        description: "Learn techniques for better sleep quality",
        action: "Learn More",
      });
    }

    if (summary.topics.some((topic) => topic.includes("work"))) {
      recommendations.push({
        type: "resource",
        title: "Work-Life Balance",
        description: "Strategies for managing work-related stress",
        action: "Explore Tips",
      });
    }

    return recommendations;
  }, []);

  return {
    generateResponse,
    getSessionSummary,
    resetSession,
    getConversationHistory,
    checkForCrisis,
    getRecommendations,
    isLoading,
    error,
  };
};
