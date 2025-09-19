"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, User, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatMessage = ({
  message,
  timestamp,
  isUser,
  isTyping = false,
  mood,
}) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: "bg-green-100 text-green-800",
      sad: "bg-blue-100 text-blue-800",
      anxious: "bg-yellow-100 text-yellow-800",
      angry: "bg-red-100 text-red-800",
      neutral: "bg-gray-100 text-gray-800",
      excited: "bg-purple-100 text-purple-800",
    };
    return moodColors[mood] || moodColors.neutral;
  };

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/therapeia-ai-avatar.jpg" alt="Therapeia AI" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
            <Brain className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
      >
        <div className="flex items-center gap-2 mb-1">
          {!isUser && (
            <span className="text-sm font-medium text-blue-600">
              Therapeia AI
            </span>
          )}
          {isUser && mood && (
            <Badge
              variant="secondary"
              className={cn("text-xs", getMoodColor(mood))}
            >
              <Heart className="w-3 h-3 mr-1" />
              {mood}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(timestamp)}
          </span>
        </div>

        <Card
          className={cn(
            "max-w-md",
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none"
              : "bg-background border"
          )}
        >
          <CardContent className="p-3">
            {isTyping ? (
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  Therapeia is thinking...
                </span>
              </div>
            ) : (
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isUser ? "text-white" : "text-foreground"
                )}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/user-avatar.jpg" alt="You" />
          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-xs">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
