"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  AlertTriangle,
  Mic,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const moods = [
    {
      id: "happy",
      label: "Happy",
      icon: Smile,
      color: "text-green-600 hover:bg-green-50",
    },
    {
      id: "sad",
      label: "Sad",
      icon: Frown,
      color: "text-blue-600 hover:bg-blue-50",
    },
    {
      id: "anxious",
      label: "Anxious",
      icon: AlertTriangle,
      color: "text-yellow-600 hover:bg-yellow-50",
    },
    {
      id: "angry",
      label: "Angry",
      icon: Zap,
      color: "text-red-600 hover:bg-red-50",
    },
    {
      id: "neutral",
      label: "Neutral",
      icon: Meh,
      color: "text-gray-600 hover:bg-gray-50",
    },
    {
      id: "excited",
      label: "Excited",
      icon: Heart,
      color: "text-purple-600 hover:bg-purple-50",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), selectedMood);
      setMessage("");
      setSelectedMood(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  return (
    <Card className="border-t bg-background/95 backdrop-blur">
      <CardContent className="p-4">
        {/* Mood Selection */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2">
            How are you feeling right now?
          </p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <Button
                  key={mood.id}
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSelectedMood(selectedMood === mood.id ? null : mood.id)
                  }
                  className={cn(
                    "h-8 px-3 text-xs",
                    mood.color,
                    selectedMood === mood.id &&
                      "bg-primary/10 border border-primary/20"
                  )}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {mood.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Textarea
              placeholder="Share what's on your mind... I'm here to listen and support you."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              className="min-h-[80px] pr-24 resize-none border-2 focus:border-blue-300"
            />

            {/* Input Actions */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={toggleRecording}
              >
                <Mic className={cn("w-4 h-4", isRecording && "text-red-500")} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Send Button and Character Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedMood && (
                <Badge variant="secondary" className="text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  Feeling {selectedMood}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {message.length}/1000
              </span>
            </div>

            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setMessage("I need help with anxiety")}
            >
              Help with anxiety
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setMessage("I'm feeling overwhelmed")}
            >
              Feeling overwhelmed
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() =>
                setMessage("Can you guide me through a breathing exercise?")
              }
            >
              Breathing exercise
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setMessage("I want to talk about my day")}
            >
              Talk about my day
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInput;
