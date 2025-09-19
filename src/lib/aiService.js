import huggingFaceService from "./huggingfaceService.js";

/**
 * AI Service for Therapeia - Mental Health Chatbot
 * Provides intelligent, context-aware responses for therapeutic conversations
 * Now powered by FREE Hugging Face models for real AI conversations
 */

class TherapyAI {
  constructor() {
    this.conversationContext = [];
    this.userProfile = {
      primaryConcerns: [],
      moodHistory: [],
      preferredCopingStrategies: [],
      sessionCount: 0,
    };
    this.currentSession = {
      startTime: new Date(),
      topics: [],
      mood: null,
      interventions: [],
    };
  }

  /**
   * Main method to generate AI responses
   */
  async generateResponse(userMessage, mood = null, conversationHistory = []) {
    // Update context and user profile
    this.updateContext(userMessage, mood, conversationHistory);

    // Analyze the user's message
    const analysis = this.analyzeMessage(userMessage, mood);

    // Generate appropriate response based on analysis
    const response = await this.craftResponse(analysis, userMessage);

    // Update conversation history
    this.conversationContext.push({
      user: userMessage,
      ai: response,
      timestamp: new Date(),
      mood: mood,
      analysis: analysis,
    });

    return response;
  }

  /**
   * Update conversation context and user profile
   */
  updateContext(message, mood, history) {
    // Update mood history
    if (mood) {
      this.userProfile.moodHistory.push({
        mood: mood,
        timestamp: new Date(),
        context: message.substring(0, 100), // First 100 chars for context
      });
      this.currentSession.mood = mood;
    }

    // Extract and track topics/concerns
    const concerns = this.extractConcerns(message);
    this.userProfile.primaryConcerns.push(...concerns);
    this.currentSession.topics.push(...concerns);
  }

  /**
   * Analyze user message for emotional content, urgency, and therapeutic needs
   */
  analyzeMessage(message, mood) {
    const lowerMessage = message.toLowerCase();

    const analysis = {
      emotionalState: this.detectEmotionalState(lowerMessage, mood),
      urgencyLevel: this.assessUrgency(lowerMessage),
      therapeuticNeeds: this.identifyTherapeuticNeeds(lowerMessage),
      conversationStage: this.determineConversationStage(),
      keyTopics: this.extractKeyTopics(lowerMessage),
    };

    return analysis;
  }

  /**
   * Detect emotional state from message content
   */
  detectEmotionalState(message, mood) {
    const emotionalIndicators = {
      anxiety: {
        keywords: [
          "anxious",
          "worried",
          "nervous",
          "panic",
          "fear",
          "scared",
          "stress",
          "overwhelm",
        ],
        intensity: 0,
      },
      depression: {
        keywords: [
          "sad",
          "depressed",
          "hopeless",
          "empty",
          "worthless",
          "tired",
          "exhausted",
        ],
        intensity: 0,
      },
      anger: {
        keywords: [
          "angry",
          "frustrated",
          "mad",
          "furious",
          "irritated",
          "annoyed",
        ],
        intensity: 0,
      },
      positive: {
        keywords: [
          "happy",
          "good",
          "better",
          "excited",
          "grateful",
          "hopeful",
          "proud",
        ],
        intensity: 0,
      },
    };

    // Calculate intensity for each emotional state
    Object.keys(emotionalIndicators).forEach((emotion) => {
      emotionalIndicators[emotion].keywords.forEach((keyword) => {
        if (message.includes(keyword)) {
          emotionalIndicators[emotion].intensity += 1;
        }
      });
    });

    // Find dominant emotion
    const dominantEmotion = Object.keys(emotionalIndicators).reduce((a, b) =>
      emotionalIndicators[a].intensity > emotionalIndicators[b].intensity
        ? a
        : b
    );

    return {
      primary: dominantEmotion,
      intensity: emotionalIndicators[dominantEmotion].intensity,
      mood: mood,
      indicators: emotionalIndicators,
    };
  }

  /**
   * Assess urgency level of the message
   */
  assessUrgency(message) {
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

    const highUrgencyKeywords = [
      "crisis",
      "emergency",
      "help me",
      "can't cope",
      "breaking down",
      "panic attack",
      "can't breathe",
      "losing control",
    ];

    if (crisisKeywords.some((keyword) => message.includes(keyword))) {
      return "crisis";
    }

    if (highUrgencyKeywords.some((keyword) => message.includes(keyword))) {
      return "high";
    }

    return "normal";
  }

  /**
   * Identify therapeutic needs and appropriate interventions
   */
  identifyTherapeuticNeeds(message) {
    const needs = [];

    if (message.includes("anxious") || message.includes("panic")) {
      needs.push(
        "anxiety_management",
        "breathing_exercises",
        "grounding_techniques"
      );
    }

    if (message.includes("sad") || message.includes("depressed")) {
      needs.push(
        "mood_support",
        "behavioral_activation",
        "cognitive_restructuring"
      );
    }

    if (message.includes("overwhelmed") || message.includes("stressed")) {
      needs.push("stress_management", "prioritization", "mindfulness");
    }

    if (message.includes("relationship") || message.includes("family")) {
      needs.push("relationship_support", "communication_skills");
    }

    if (message.includes("work") || message.includes("job")) {
      needs.push("work_stress", "work_life_balance");
    }

    return needs;
  }

  /**
   * Determine what stage of conversation we're in
   */
  determineConversationStage() {
    const messageCount = this.conversationContext.length;

    if (messageCount === 0) return "greeting";
    if (messageCount <= 2) return "assessment";
    if (messageCount <= 5) return "exploration";
    return "intervention";
  }

  /**
   * Extract key topics from message
   */
  extractKeyTopics(message) {
    const topicKeywords = {
      relationships: ["relationship", "partner", "family", "friends", "social"],
      work: ["work", "job", "career", "boss", "colleague", "workplace"],
      health: ["health", "physical", "medical", "doctor", "illness"],
      finances: ["money", "financial", "debt", "bills", "budget"],
      education: ["school", "university", "studies", "exam", "grades"],
      identity: ["identity", "self", "who am i", "purpose", "meaning"],
    };

    const topics = [];
    Object.keys(topicKeywords).forEach((topic) => {
      if (topicKeywords[topic].some((keyword) => message.includes(keyword))) {
        topics.push(topic);
      }
    });

    return topics;
  }

  /**
   * Extract concerns from user message
   */
  extractConcerns(message) {
    const concerns = [];
    const lowerMessage = message.toLowerCase();

    const concernPatterns = [
      { pattern: /i'm worried about (.+?)(?:\.|$)/, type: "worry" },
      { pattern: /i'm struggling with (.+?)(?:\.|$)/, type: "struggle" },
      { pattern: /i can't (.+?)(?:\.|$)/, type: "inability" },
      { pattern: /i feel (.+?)(?:\.|$)/, type: "feeling" },
    ];

    concernPatterns.forEach(({ pattern, type }) => {
      const matches = lowerMessage.match(pattern);
      if (matches) {
        concerns.push({
          type: type,
          content: matches[1].trim(),
          timestamp: new Date(),
        });
      }
    });

    return concerns;
  }

  /**
   * Craft appropriate therapeutic response using real AI
   */
  async craftResponse(analysis, userMessage) {
    const { urgencyLevel } = analysis;

    // Hugging Face is always available (free models don't require API keys)
    try {
      // Use real AI for response generation
      const conversationHistory = this.conversationContext.map((ctx) => ({
        role: ctx.user ? "user" : "assistant",
        message: ctx.user || ctx.ai,
        mood: ctx.mood,
        timestamp: ctx.timestamp,
      }));

      const aiResponse = await huggingFaceService.generateResponse(
        userMessage,
        conversationHistory,
        this.currentSession.mood,
        analysis
      );

      return aiResponse;
    } catch (error) {
      console.error("Error generating Hugging Face AI response:", error);

      // Fallback to mock responses if Hugging Face fails
      return this.generateFallbackResponse(analysis, userMessage);
    }
  }

  /**
   * Fallback response generation (original mock system)
   */
  generateFallbackResponse(analysis, userMessage) {
    const {
      emotionalState,
      urgencyLevel,
      therapeuticNeeds,
      conversationStage,
    } = analysis;

    // Handle crisis situations first
    if (urgencyLevel === "crisis") {
      return this.generateCrisisResponse();
    }

    // Generate response based on conversation stage and needs
    switch (conversationStage) {
      case "greeting":
        return this.generateGreetingResponse();
      case "assessment":
        return this.generateAssessmentResponse(emotionalState, userMessage);
      case "exploration":
        return this.generateExplorationResponse(analysis, userMessage);
      case "intervention":
        return this.generateInterventionResponse(
          therapeuticNeeds,
          analysis,
          userMessage
        );
      default:
        return this.generateSupportiveResponse(emotionalState, userMessage);
    }
  }

  /**
   * Generate crisis intervention response
   */
  generateCrisisResponse() {
    const crisisResponses = [
      "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to a crisis hotline immediately - they have trained professionals available 24/7. In the US, you can call 988 for the Suicide & Crisis Lifeline. You don't have to go through this alone.",
      "Thank you for trusting me with these difficult feelings. I want you to know that there is help available, and things can get better. Please reach out to emergency services or a crisis hotline right away. The National Suicide Prevention Lifeline is available 24/7 at 988. Your life has value, and there are people who want to help.",
      "I hear that you're in tremendous pain right now. These feelings are temporary, even though they feel overwhelming. Please contact a crisis professional immediately - call 988 or text 'HELLO' to 741741. You deserve support and care during this difficult time.",
    ];

    return crisisResponses[Math.floor(Math.random() * crisisResponses.length)];
  }

  /**
   * Generate greeting response
   */
  generateGreetingResponse() {
    const greetings = [
      "Hello! I'm Therapeia, your AI mental health companion. I'm here to provide a safe, non-judgmental space where you can share your thoughts and feelings. What's on your mind today?",
      "Welcome! I'm glad you're here. I'm Therapeia, and I'm designed to offer support and guidance for mental health concerns. How are you feeling today, and what would you like to talk about?",
      "Hi there! I'm Therapeia, your AI therapeutic companion. I'm here to listen, support, and help you work through whatever is on your mind. What brings you here today?",
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Generate assessment-focused response
   */
  generateAssessmentResponse(emotionalState, message) {
    const { primary, intensity } = emotionalState;

    const assessmentResponses = {
      anxiety: [
        "I can sense there's some anxiety in what you're sharing. Anxiety is a very common experience, and it's brave of you to talk about it. Can you tell me more about what specifically is making you feel anxious?",
        "It sounds like you're experiencing some worry or nervousness. That's completely understandable. What physical sensations are you noticing in your body right now when you think about this?",
        "I hear that anxiety is present for you. Many people struggle with anxious feelings, and you're not alone in this. What thoughts tend to go through your mind when you're feeling this way?",
      ],
      depression: [
        "I can hear the heaviness in what you're sharing. Depression can make everything feel more difficult, and I want you to know that your feelings are valid. How long have you been experiencing these feelings?",
        "It sounds like you're going through a really tough time emotionally. Depression affects many people, and it's important that you're reaching out. What does a typical day look like for you right now?",
        "Thank you for sharing something so personal with me. When you're feeling this way, what activities or thoughts tend to make it better or worse?",
      ],
      anger: [
        "I can sense there's some frustration or anger in what you're describing. Those are valid emotions, and it's important to acknowledge them. What situation or experience is contributing to these feelings?",
        "It sounds like something has really upset or frustrated you. Anger often tells us that something important to us has been threatened or violated. Can you help me understand what's behind these feelings?",
        "I hear the frustration in your message. Anger can be a difficult emotion to navigate, but it often contains important information about our needs and boundaries. What's been triggering these feelings for you?",
      ],
      positive: [
        "It's wonderful to hear some positivity in your message! Even when we're working through challenges, it's important to acknowledge the good moments. What's been contributing to these positive feelings?",
        "I'm glad to hear there are some bright spots for you right now. How does this positive experience compare to how you've been feeling lately?",
        "That's great to hear! Positive emotions can be really valuable resources when we're dealing with difficult times. How can we build on this feeling?",
      ],
    };

    const responses =
      assessmentResponses[primary] || assessmentResponses.anxiety;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate exploration-focused response
   */
  generateExplorationResponse(analysis, message) {
    const { keyTopics, emotionalState } = analysis;

    if (keyTopics.includes("relationships")) {
      return "Relationships can be such a significant part of our emotional well-being. It sounds like there's something in your relationships that's affecting you. Can you tell me more about what's happening and how it's making you feel?";
    }

    if (keyTopics.includes("work")) {
      return "Work-related stress can really impact our overall mental health. It seems like your work situation is weighing on you. What aspects of work are most challenging for you right now?";
    }

    // Default exploration responses
    const explorationResponses = [
      "I'm getting a better sense of what you're experiencing. It seems like there are several layers to what you're going through. Which aspect feels most important to explore right now?",
      "Thank you for sharing more details with me. I can see this is complex and affects you in multiple ways. What do you think would be most helpful to focus on first?",
      "I appreciate you opening up about this. From what you've shared, it sounds like this has been building up for a while. How has this been impacting your daily life?",
      "It's clear that you've been carrying a lot. Sometimes when we're dealing with multiple stressors, it can help to break things down. What feels like the most pressing concern for you right now?",
    ];

    return explorationResponses[
      Math.floor(Math.random() * explorationResponses.length)
    ];
  }

  /**
   * Generate intervention-focused response with therapeutic techniques
   */
  generateInterventionResponse(therapeuticNeeds, analysis, message) {
    if (therapeuticNeeds.includes("anxiety_management")) {
      return this.generateAnxietyIntervention();
    }

    if (therapeuticNeeds.includes("mood_support")) {
      return this.generateMoodSupportIntervention();
    }

    if (therapeuticNeeds.includes("stress_management")) {
      return this.generateStressManagementIntervention();
    }

    return this.generateGeneralIntervention(analysis);
  }

  /**
   * Generate anxiety-specific intervention
   */
  generateAnxietyIntervention() {
    const interventions = [
      "Let's try a grounding technique that can help with anxiety. Can you name 5 things you can see around you, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste? This can help bring you back to the present moment.",
      "When anxiety builds up, our breathing often becomes shallow. Let's practice box breathing: breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Try this a few times. How does that feel?",
      "Anxiety often involves our mind jumping to worst-case scenarios. Can we examine the thoughts you're having? What evidence do you have that supports this worry, and what evidence might challenge it?",
      "I'd like to help you create a coping plan for when anxiety peaks. What are 2-3 things that have helped you feel calmer in the past, even if just a little bit?",
    ];

    return interventions[Math.floor(Math.random() * interventions.length)];
  }

  /**
   * Generate mood support intervention
   */
  generateMoodSupportIntervention() {
    const interventions = [
      "When we're feeling low, sometimes small activities can make a difference. Is there one small thing you could do today that might bring you a tiny bit of joy or accomplishment? It doesn't have to be big.",
      "Depression can make everything feel pointless, but you're here talking with me, which shows incredible strength. What's one thing, however small, that you're grateful for today?",
      "Let's think about your energy and mood patterns. Are there certain times of day when you feel slightly better or worse? Understanding these patterns can help us work with your natural rhythms.",
      "Sometimes when we're depressed, our thoughts become very harsh toward ourselves. If a good friend was going through exactly what you're experiencing, what would you say to them?",
    ];

    return interventions[Math.floor(Math.random() * interventions.length)];
  }

  /**
   * Generate stress management intervention
   */
  generateStressManagementIntervention() {
    const interventions = [
      "When we're overwhelmed, it can help to separate what we can control from what we can't. Looking at your current stressors, which ones do you have some influence over, and which are outside your control?",
      "Let's try a priority exercise. If you had to choose just three things to focus on this week, what would they be? Sometimes giving ourselves permission to let other things go can reduce overwhelm.",
      "Stress often accumulates in our bodies. Take a moment to scan from your head to your toes. Where do you notice tension? Sometimes just acknowledging physical stress can help us release it.",
      "When everything feels urgent, it can help to ask: 'What would happen if I didn't do this today?' This can help us distinguish between truly urgent tasks and things that just feel urgent.",
    ];

    return interventions[Math.floor(Math.random() * interventions.length)];
  }

  /**
   * Generate general supportive intervention
   */
  generateGeneralIntervention(analysis) {
    const interventions = [
      "You've shared a lot with me, and I can see how much you're dealing with. What feels like the most important thing for you to remember as you go through the rest of your day?",
      "It takes courage to examine our thoughts and feelings this deeply. What's one insight you've had about yourself during our conversation that feels meaningful?",
      "As we wrap up this part of our conversation, what's one small step you could take today to care for yourself, even in a tiny way?",
      "You've shown a lot of self-awareness in our conversation. How can you use this understanding to be a little kinder to yourself moving forward?",
    ];

    return interventions[Math.floor(Math.random() * interventions.length)];
  }

  /**
   * Generate general supportive response
   */
  generateSupportiveResponse(emotionalState, message) {
    const supportiveResponses = [
      "I hear you, and I want you to know that what you're experiencing matters. Your feelings are valid, and it's important that you're taking the time to process them. What feels most important for you to explore right now?",
      "Thank you for sharing that with me. It sounds like you're navigating some complex emotions and experiences. You're showing a lot of courage by reaching out and being open about what you're going through.",
      "I can sense that this is really meaningful to you. Sometimes just having a space to express our thoughts and feelings can be healing in itself. How does it feel to put these experiences into words?",
      "What you're describing resonates with experiences that many people have, though I know it feels very personal and unique to you. You're not alone in feeling this way, and your willingness to explore these feelings is a strength.",
    ];

    return supportiveResponses[
      Math.floor(Math.random() * supportiveResponses.length)
    ];
  }

  /**
   * Get conversation summary for session tracking
   */
  getSessionSummary() {
    return {
      duration: Date.now() - this.currentSession.startTime.getTime(),
      messageCount: this.conversationContext.length,
      topics: [
        ...new Set(this.currentSession.topics.map((t) => t.content || t)),
      ],
      mood: this.currentSession.mood,
      interventions: this.currentSession.interventions,
      concerns: this.userProfile.primaryConcerns.slice(-5), // Last 5 concerns
    };
  }

  /**
   * Reset session (for new conversations)
   */
  resetSession() {
    this.conversationContext = [];
    this.currentSession = {
      startTime: new Date(),
      topics: [],
      mood: null,
      interventions: [],
    };
    this.userProfile.sessionCount += 1;
  }

  /**
   * Get AI service status and configuration
   */
  getAIStatus() {
    return {
      huggingFaceConfigured: huggingFaceService.isConfigured(),
      huggingFaceStatus: huggingFaceService.getStatus(),
      fallbackAvailable: true,
      currentMode: "Hugging Face AI (FREE)",
      availableModels: huggingFaceService.getAvailableModels(),
    };
  }
}

// Export singleton instance
const therapyAI = new TherapyAI();
export default therapyAI;
