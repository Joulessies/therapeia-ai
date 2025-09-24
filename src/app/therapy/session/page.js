"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import AISettings from "@/components/AISettings";
import CrisisAlert from "@/components/CrisisAlert";
import { useTherapyAI } from "@/hooks/useTherapyAI";
import {
  Brain,
  Target,
  ClipboardList,
  Heart,
  Activity,
  Lightbulb,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Shield,
  TimerReset,
  Sparkles,
} from "lucide-react";

const stepsDefinition = [
  {
    id: "checkin",
    title: "Check-in",
    description:
      "Briefly describe how you're feeling and what's bringing you here today.",
    aiPrompt:
      "Please reflect back empathically and ask one gentle open-ended question based on this check-in. Avoid crisis resources unless clearly indicated.",
  },
  {
    id: "goals",
    title: "Set Goals",
    description:
      "Define 1-2 specific goals you'd like to focus on during this session.",
    aiPrompt:
      "Help refine these goals using SMART framing in 2-3 short bullet points.",
  },
  {
    id: "explore",
    title: "Explore",
    description:
      "Share key thoughts, feelings, or situations related to your goals.",
    aiPrompt:
      "Use active listening and offer one CBT-style reflection or question.",
  },
  {
    id: "coping",
    title: "Coping Exercise",
    description:
      "Write a quick plan for a technique you'd like to try (e.g., breathing or grounding).",
    aiPrompt:
      "Suggest one brief evidence-based exercise with 4-6 numbered steps.",
  },
  {
    id: "plan",
    title: "Action Plan",
    description: "List 1-3 small steps you'll take after this session.",
    aiPrompt:
      "Turn these into a short, compassionate action plan with checkboxes.",
  },
  {
    id: "summary",
    title: "Summary",
    description:
      "Summarize your takeaways and anything you'd like to remember.",
    aiPrompt:
      "Provide a warm 3-sentence summary highlighting strengths and next steps.",
  },
];

export default function GuidedSessionPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [notesByStep, setNotesByStep] = useState({});
  const [aiByStep, setAiByStep] = useState({});
  const [showAISettings, setShowAISettings] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const sessionStartRef = useRef(new Date());

  const {
    generateResponse,
    getSessionSummary,
    checkForCrisis,
    getRecommendations,
    isLoading,
    error,
  } = useTherapyAI();

  const steps = stepsDefinition;
  const activeStep = steps[activeIdx];

  const progress = useMemo(() => {
    if (steps.length === 0) return 0;
    return Math.round(((activeIdx + 1) / steps.length) * 100);
  }, [activeIdx, steps.length]);

  const durationMinutes = Math.max(
    0,
    Math.floor((Date.now() - sessionStartRef.current.getTime()) / 60000)
  );

  const recommendations = useMemo(
    () => getRecommendations(),
    [getRecommendations]
  );

  useEffect(() => {
    // Crisis keyword check on each note change
    const currentNotes = notesByStep[activeStep?.id] || "";
    if (currentNotes && checkForCrisis(currentNotes)) {
      setShowCrisisAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, notesByStep]);

  const setNotes = (stepId, value) => {
    setNotesByStep((prev) => ({ ...prev, [stepId]: value }));
  };

  const askAI = async () => {
    const stepId = activeStep.id;
    const userText = (notesByStep[stepId] || "").trim();
    const systemHint = activeStep.aiPrompt;
    const message = `Session step: ${activeStep.title}\nUser notes: ${
      userText || "(none)"
    }\nGuidance request: ${systemHint}`;

    try {
      const reply = await generateResponse(message, null);
      setAiByStep((prev) => ({ ...prev, [stepId]: reply }));
    } catch (e) {
      // Handled by hook error; store a simple fallback
      setAiByStep((prev) => ({
        ...prev,
        [stepId]: "I'm having trouble right now. Please try again in a moment.",
      }));
    }
  };

  const nextStep = () => {
    setActiveIdx((idx) => Math.min(steps.length - 1, idx + 1));
  };

  const prevStep = () => {
    setActiveIdx((idx) => Math.max(0, idx - 1));
  };

  const resetSession = () => {
    setActiveIdx(0);
    setNotesByStep({});
    setAiByStep({});
    sessionStartRef.current = new Date();
  };

  const completed = activeIdx === steps.length - 1;

  const sessionSummary = getSessionSummary();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src="/images/logo.png"
                alt="Therapeia Logo"
                width={64}
                height={64}
                className="w-full h-full"
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-teal-700 mb-2">
                Guided Session
              </h1>
              <p className="text-xl text-gray-600">
                A structured, supportive flow to help you make progress today
              </p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>
                Step {activeIdx + 1} of {steps.length}
              </span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Step Area */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Target className="w-5 h-5" />
                  {activeStep.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{activeStep.description}</p>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Your notes</label>
                  <Textarea
                    value={notesByStep[activeStep.id] || ""}
                    onChange={(e) => setNotes(activeStep.id, e.target.value)}
                    placeholder="Type your thoughts here..."
                    className="min-h-[140px] border-2 focus:border-blue-300"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={askAI}
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI for guidance
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700"
                    onClick={() => setShowAISettings(true)}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600"
                    onClick={() => setShowCrisisAlert(true)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Crisis Support
                  </Button>
                </div>

                {isLoading && (
                  <div className="text-sm text-gray-600">
                    Therapeia is thinking…
                  </div>
                )}

                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    {error}
                  </div>
                )}

                {aiByStep[activeStep.id] && (
                  <div className="p-4 rounded border bg-blue-50/60 border-blue-200">
                    <div className="flex items-center gap-2 mb-2 text-blue-800">
                      <Lightbulb className="w-4 h-4" />
                      <span className="font-medium">AI Guidance</span>
                    </div>
                    <div className="text-sm text-blue-900 whitespace-pre-wrap">
                      {aiByStep[activeStep.id]}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    className="border-teal-200 text-teal-700"
                    onClick={prevStep}
                    disabled={activeIdx === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-300"
                      onClick={resetSession}
                    >
                      <TimerReset className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Finish
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* When finished, show a friendly nudge */}
            {completed && (
              <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-teal-800 mb-2 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Nice work today
                  </h3>
                  <p className="text-teal-700 mb-4">
                    Consider saving your notes or trying a short exercise next.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/therapy/exercises">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        Explore Exercises
                      </Button>
                    </Link>
                    <Link href="/therapy/chat">
                      <Button
                        variant="outline"
                        className="border-teal-300 text-teal-700"
                      >
                        Continue in Chat
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Steps list */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Session Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between p-2 rounded border ${
                      idx === activeIdx
                        ? "border-teal-300 bg-teal-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="text-sm">
                      <div
                        className={`font-medium ${
                          idx === activeIdx ? "text-teal-800" : "text-gray-800"
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-1">
                        {s.description}
                      </div>
                    </div>
                    {aiByStep[s.id] && (
                      <Badge variant="secondary" className="text-xs">
                        AI
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Session info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Session Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{durationMinutes} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Steps completed</span>
                  <span className="font-medium">
                    {activeIdx} / {steps.length - 1}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">AI prompts used</span>
                  <span className="font-medium">
                    {Object.keys(aiByStep).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-blue-700">
                    <Lightbulb className="w-4 h-4" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <div
                      key={i}
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

            {/* Gentle reminder */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">
                    You&apos;re doing something good for yourself today.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
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
}
