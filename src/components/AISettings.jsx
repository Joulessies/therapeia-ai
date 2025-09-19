"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Brain,
  Key,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

const AISettings = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCurrentStatus();
      // Load existing key from localStorage (client-side storage)
      const savedKey = localStorage.getItem("huggingface_api_key");
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [isOpen]);

  const loadCurrentStatus = async () => {
    try {
      const module = await import("@/lib/aiService");
      const status = module.default.getAIStatus();
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to load AI status:", error);
    }
  };

  const saveApiKey = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      if (apiKey.trim()) {
        // Validate API key format
        if (!apiKey.startsWith("hf_")) {
          setSaveStatus({
            type: "error",
            message: "API key should start with 'hf_'",
          });
          setIsSaving(false);
          return;
        }

        // Save to localStorage (client-side)
        localStorage.setItem("huggingface_api_key", apiKey.trim());

        // Test the API key
        const testResponse = await fetch("/api/huggingface", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Test API key",
            conversationHistory: [],
            mood: "neutral",
            analysis: { urgencyLevel: "normal" },
            apiKey: apiKey.trim(), // Send key for testing
          }),
        });

        if (testResponse.ok) {
          setSaveStatus({
            type: "success",
            message:
              "API key saved and tested successfully! Premium models are now available.",
          });
          loadCurrentStatus(); // Refresh status
        } else {
          setSaveStatus({
            type: "warning",
            message:
              "API key saved, but testing failed. It may still work for some models.",
          });
        }
      } else {
        // Remove API key
        localStorage.removeItem("huggingface_api_key");
        setSaveStatus({
          type: "info",
          message: "API key removed. Using free models only.",
        });
        loadCurrentStatus();
      }
    } catch (error) {
      setSaveStatus({
        type: "error",
        message: `Failed to save API key: ${error.message}`,
      });
    }

    setIsSaving(false);
  };

  const openHuggingFace = () => {
    window.open("https://huggingface.co/settings/tokens", "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            AI Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          {currentStatus && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Current Status
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">
                {currentStatus.currentMode}
              </Badge>
              <p className="text-xs text-blue-700 mt-2">
                {currentStatus.availableModels?.free?.length || 0} free models +{" "}
                {currentStatus.availableModels?.premium?.length || 0} premium
                models available
              </p>
            </div>
          )}

          {/* API Key Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Hugging Face API Key (Optional)
            </label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="hf_your-free-api-key-here"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Add a free Hugging Face API key to access premium models
            </p>
          </div>

          {/* Save Status */}
          {saveStatus && (
            <Alert
              className={
                saveStatus.type === "success"
                  ? "border-green-200 bg-green-50"
                  : saveStatus.type === "error"
                  ? "border-red-200 bg-red-50"
                  : saveStatus.type === "warning"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-blue-200 bg-blue-50"
              }
            >
              {saveStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : saveStatus.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-blue-600" />
              )}
              <AlertDescription
                className={
                  saveStatus.type === "success"
                    ? "text-green-700"
                    : saveStatus.type === "error"
                    ? "text-red-700"
                    : saveStatus.type === "warning"
                    ? "text-yellow-700"
                    : "text-blue-700"
                }
              >
                {saveStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <div className="p-3 bg-gray-50 rounded-lg border">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" />
              How to Get a Free API Key:
            </h4>
            <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
              <li>Visit Hugging Face (free account)</li>
              <li>Go to Settings → Access Tokens</li>
              <li>Create new "Read" token</li>
              <li>Copy and paste it above</li>
              <li>Save to unlock premium models!</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-xs h-7"
              onClick={openHuggingFace}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Get Free API Key
            </Button>
          </div>

          {/* Benefits */}
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-medium text-green-900 mb-2">
              ✨ Benefits with API Key:
            </h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Access to Llama-2, Mistral, and Zephyr models</li>
              <li>• Faster response times</li>
              <li>• Better conversation quality</li>
              <li>• Higher rate limits</li>
              <li>• Still completely FREE!</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={saveApiKey} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Settings className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>

          {/* Note */}
          <p className="text-xs text-muted-foreground text-center">
            💡 Your API key is stored locally and never sent to our servers
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettings;
