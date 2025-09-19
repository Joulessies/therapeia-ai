"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import CrisisAlert from "@/components/CrisisAlert";
import AISettings from "@/components/AISettings";
import { useTherapyAI } from "@/hooks/useTherapyAI";
import {
  Brain,
  Shield,
  Phone,
  MessageSquare,
  Clock,
  Users,
  Heart,
  Activity,
  Lightbulb,
  BookOpen,
  Settings,
} from "lucide-react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hello! I'm Therapeia, your AI mental health companion. I'm here to provide support, guidance, and a safe space for you to share your thoughts and feelings. How are you doing today?",
      timestamp: new Date(),
      isUser: false,
      isTyping: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({
    startTime: new Date(),
    messageCount: 0,
    currentMood: null,
  });
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showAISettings, setShowAISettings] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

  // Initialize AI service
  const {
    generateResponse,
    getSessionSummary,
    checkForCrisis,
    getRecommendations,
    isLoading: aiLoading,
    error: aiError,
  } = useTherapyAI();

  // Get AI service status
  const [aiStatus, setAiStatus] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update recommendations when session info changes
  useEffect(() => {
    const newRecommendations = getRecommendations();
    setRecommendations(newRecommendations);
  }, [sessionInfo, getRecommendations]);

  // Get AI status on component mount
  useEffect(() => {
    import("@/lib/aiService").then((module) => {
      const status = module.default.getAIStatus();
      setAiStatus(status);
    });
  }, []);

  const handleSendMessage = async (message, mood) => {
    // Check for crisis indicators
    if (checkForCrisis(message)) {
      setShowCrisisAlert(true);
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      isUser: true,
      mood,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSessionInfo((prev) => ({
      ...prev,
      messageCount: prev.messageCount + 1,
      currentMood: mood || prev.currentMood,
    }));

    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response using the new service
      const aiResponseText = await generateResponse(message, mood);

      setIsTyping(false);

      const aiResponse = {
        id: Date.now() + 1,
        message: aiResponseText,
        timestamp: new Date(),
        isUser: false,
        isTyping: false,
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Update session info with AI service data
      const summary = getSessionSummary();
      setSessionInfo((prev) => ({
        ...prev,
        ...summary,
      }));
    } catch (error) {
      setIsTyping(false);
      console.error("Error generating AI response:", error);

      // Fallback response
      const fallbackResponse = {
        id: Date.now() + 1,
        message:
          "I apologize, but I'm having some technical difficulties right now. Your message is important to me. Please try again, and if this continues, consider reaching out to a human counselor.",
        timestamp: new Date(),
        isUser: false,
        isTyping: false,
      };

      setMessages((prev) => [...prev, fallbackResponse]);
    }
  };

  const formatSessionDuration = (startTime) => {
    const now = new Date();
    const diff = Math.floor((now - startTime) / 1000 / 60); // minutes
    return diff < 1 ? "Just started" : `${diff} min`;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col h-[calc(100vh-8rem)]">
          {/* Chat Header */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/logo.png"
                      alt="Therapeia Logo"
                      width={40}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-teal-700">
                      Chat with Therapeia AI
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your confidential mental health companion
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </Badge>
                  {aiStatus && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      <Brain className="w-3 h-3 mr-1" />
                      {aiStatus.currentMode}
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200"
                    onClick={() => setShowAISettings(true)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    AI Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Crisis Support
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Messages Area */}
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg.message}
                      timestamp={msg.timestamp}
                      isUser={msg.isUser}
                      mood={msg.mood}
                      isTyping={msg.isTyping}
                    />
                  ))}
                  {isTyping && (
                    <ChatMessage
                      message=""
                      timestamp={new Date()}
                      isUser={false}
                      isTyping={true}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Input */}
          <div className="mt-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping || aiLoading}
            />
            {aiError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{aiError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Session Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Session Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {formatSessionDuration(sessionInfo.startTime)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">{sessionInfo.messageCount}</span>
              </div>
              {sessionInfo.currentMood && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Mood</span>
                  <Badge variant="secondary" className="text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    {sessionInfo.currentMood}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-blue-700">
                  <Lightbulb className="w-4 h-4" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-2 bg-white rounded border border-blue-200"
                  >
                    <h4 className="text-sm font-medium text-blue-900">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-blue-700 mb-2">
                      {rec.description}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6 border-blue-300 text-blue-700"
                    >
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Resources */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Quick Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm h-auto py-2"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Breathing Exercises
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm h-auto py-2"
              >
                <Heart className="w-4 h-4 mr-2" />
                Mood Tracker
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm h-auto py-2"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Journal Prompts
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm h-auto py-2"
              >
                <Users className="w-4 h-4 mr-2" />
                Support Groups
              </Button>
            </CardContent>
          </Card>

          {/* Crisis Support */}
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-red-700">
                <Shield className="w-4 h-4" />
                Need Immediate Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-red-600">
                If you're in crisis or having thoughts of self-harm, please
                reach out immediately.
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Crisis Hotline
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Emergency Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Crisis Alert Modal */}
      <CrisisAlert
        isVisible={showCrisisAlert}
        onDismiss={() => setShowCrisisAlert(false)}
      />

      {/* AI Settings Modal */}
      <AISettings
        isOpen={showAISettings}
        onClose={() => setShowAISettings(false)}
      />
    </div>
  );
};

export default ChatPage;
