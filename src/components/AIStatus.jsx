"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, AlertCircle, Zap, Cpu } from "lucide-react";

const AIStatus = () => {
  const [aiStatus, setAiStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAIStatus = async () => {
      try {
        const module = await import("@/lib/aiService");
        const status = module.default.getAIStatus();
        setAiStatus(status);
      } catch (error) {
        console.error("Failed to load AI status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAIStatus();
  }, []);

  const testAI = async () => {
    try {
      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello, this is a test message",
          conversationHistory: [],
          mood: "neutral",
          analysis: {
            urgencyLevel: "normal",
            emotionalState: { primary: "neutral" },
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `✅ AI Test Successful!\n\nModel: ${data.model}\nResponse: "${data.message}"`
        );
      } else {
        alert(`⚠️ AI Test Warning:\n\n${data.message}`);
      }
    } catch (error) {
      alert(`❌ AI Test Failed:\n\n${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>Loading AI Status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!aiStatus) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>AI Status Unavailable</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-green-700">
          <Brain className="w-5 h-5" />
          AI Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Mode */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Mode:</span>
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {aiStatus.currentMode}
          </Badge>
        </div>

        {/* Service Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Service Status:</span>
          <Badge className="bg-green-100 text-green-800">
            <Zap className="w-3 h-3 mr-1" />
            {aiStatus.huggingFaceConfigured ? "Ready" : "Not Configured"}
          </Badge>
        </div>

        {/* Available Models */}
        {aiStatus.availableModels && (
          <div>
            <span className="text-sm font-medium">Available Models:</span>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-xs text-green-600 font-medium">
                  🆓 Free Models ({aiStatus.availableModels.free?.length || 0}):
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiStatus.availableModels.free?.slice(0, 3).map((model) => (
                    <Badge
                      key={model}
                      variant="outline"
                      className="text-xs bg-green-50 border-green-200"
                    >
                      {model.split("/").pop()}
                    </Badge>
                  ))}
                  {aiStatus.availableModels.free?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{aiStatus.availableModels.free.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-blue-600 font-medium">
                  ⭐ Premium Models (
                  {aiStatus.availableModels.premium?.length || 0}):
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiStatus.availableModels.premium
                    ?.slice(0, 2)
                    .map((model) => (
                      <Badge
                        key={model}
                        variant="outline"
                        className="text-xs bg-blue-50 border-blue-200"
                      >
                        {model.split("/").pop()}
                      </Badge>
                    ))}
                  {aiStatus.availableModels.premium?.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{aiStatus.availableModels.premium.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Model */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Model:</span>
          <Badge
            variant="outline"
            className="text-xs bg-yellow-50 border-yellow-200"
          >
            {aiStatus.availableModels?.current?.split("/").pop() || "Default"}
          </Badge>
        </div>

        {/* Test Button */}
        <div className="pt-2 border-t border-green-200">
          <Button
            onClick={testAI}
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            Test AI Integration
          </Button>
        </div>

        {/* Status Info */}
        <div className="pt-2 border-t border-green-200">
          <p className="text-xs text-green-600">
            ✅ Ready to use - No API key required for basic functionality!
          </p>
          <p className="text-xs text-green-600 mt-1">
            💡 Add a free Hugging Face API key for premium models
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIStatus;
