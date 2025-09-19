"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Moon,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  Star,
  Headphones,
  Heart,
  Brain,
  Leaf,
  Sun,
  Wind,
  Waves,
  Mountain,
} from "lucide-react";

const MeditationPage = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState([
    "breathing-basics",
    "body-scan-short",
  ]);

  const meditationCategories = [
    {
      id: "beginner",
      title: "Beginner Friendly",
      description: "Perfect for those new to meditation",
      icon: Leaf,
      color: "bg-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      sessions: [
        {
          id: "breathing-basics",
          title: "Breathing Basics",
          description: "Learn fundamental breathing techniques for relaxation",
          duration: 5,
          instructor: "Sarah Chen",
          background: "forest",
          benefits: ["Reduces anxiety", "Improves focus", "Easy to learn"],
        },
        {
          id: "body-scan-short",
          title: "Quick Body Scan",
          description: "A gentle body awareness practice",
          duration: 8,
          instructor: "Michael Torres",
          background: "ocean",
          benefits: ["Releases tension", "Body awareness", "Stress relief"],
        },
        {
          id: "mindful-moments",
          title: "Mindful Moments",
          description: "Present moment awareness practice",
          duration: 10,
          instructor: "Emma Wilson",
          background: "mountain",
          benefits: ["Present focus", "Mental clarity", "Calm mind"],
        },
      ],
    },
    {
      id: "stress-relief",
      title: "Stress Relief",
      description: "Targeted sessions for stress and anxiety",
      icon: Heart,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      sessions: [
        {
          id: "anxiety-relief",
          title: "Anxiety Relief",
          description: "Calm your anxious mind with guided techniques",
          duration: 12,
          instructor: "Dr. Lisa Park",
          background: "rain",
          benefits: ["Calms anxiety", "Regulates breathing", "Mental peace"],
        },
        {
          id: "work-stress",
          title: "Work Stress Relief",
          description: "Decompress from work-related stress",
          duration: 15,
          instructor: "James Rodriguez",
          background: "sunset",
          benefits: ["Work-life balance", "Mental reset", "Energy restore"],
        },
        {
          id: "tension-release",
          title: "Tension Release",
          description: "Release physical and mental tension",
          duration: 18,
          instructor: "Maya Patel",
          background: "forest",
          benefits: ["Muscle relaxation", "Stress reduction", "Inner calm"],
        },
      ],
    },
    {
      id: "sleep",
      title: "Sleep & Rest",
      description: "Wind down and prepare for restful sleep",
      icon: Moon,
      color: "bg-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      sessions: [
        {
          id: "bedtime-relaxation",
          title: "Bedtime Relaxation",
          description: "Gentle practice to prepare for sleep",
          duration: 20,
          instructor: "Sophie Martin",
          background: "night",
          benefits: ["Better sleep", "Relaxation", "Calm mind"],
        },
        {
          id: "deep-rest",
          title: "Deep Rest",
          description: "Profound relaxation for body and mind",
          duration: 25,
          instructor: "Alex Thompson",
          background: "stars",
          benefits: ["Deep relaxation", "Sleep quality", "Recovery"],
        },
        {
          id: "insomnia-help",
          title: "Insomnia Support",
          description: "Specialized practice for sleep difficulties",
          duration: 30,
          instructor: "Dr. Rachel Kim",
          background: "moon",
          benefits: ["Sleep induction", "Mind quieting", "Rest preparation"],
        },
      ],
    },
    {
      id: "focus",
      title: "Focus & Clarity",
      description: "Enhance concentration and mental clarity",
      icon: Brain,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      sessions: [
        {
          id: "concentration-boost",
          title: "Concentration Boost",
          description: "Sharpen your focus and attention",
          duration: 15,
          instructor: "David Lee",
          background: "mountain",
          benefits: ["Better focus", "Mental clarity", "Productivity"],
        },
        {
          id: "mental-clarity",
          title: "Mental Clarity",
          description: "Clear mental fog and enhance awareness",
          duration: 20,
          instructor: "Nina Foster",
          background: "sky",
          benefits: ["Clear thinking", "Decision making", "Awareness"],
        },
      ],
    },
  ];

  const backgroundSounds = {
    forest: "🌲 Forest sounds",
    ocean: "🌊 Ocean waves",
    rain: "🌧️ Gentle rain",
    mountain: "🏔️ Mountain breeze",
    sunset: "🌅 Evening calm",
    night: "🌙 Night ambiance",
    stars: "⭐ Starry night",
    moon: "🌕 Moonlight",
    sky: "☁️ Open sky",
  };

  useEffect(() => {
    let interval;
    if (isPlaying && activeSession && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            setProgress(100);
            setCompletedSessions((prev) => [...prev, activeSession.id]);
            return 0;
          }
          const newTime = prev - 1;
          setProgress(
            ((activeSession.duration * 60 - newTime) /
              (activeSession.duration * 60)) *
              100
          );
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSession, timeRemaining]);

  const startSession = (session) => {
    setActiveSession(session);
    setTimeRemaining(session.duration * 60);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    if (activeSession) {
      setTimeRemaining(activeSession.duration * 60);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const SessionPlayer = ({ session }) => (
    <Card className="mb-6 border-2 border-indigo-200 bg-indigo-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-indigo-800 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            {session.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSession(null)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-indigo-700">
          with {session.instructor} • {backgroundSounds[session.background]}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-700">Progress</span>
              <span className="text-lg font-mono font-semibold text-indigo-800">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={togglePlayPause}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 w-16 h-16 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={resetSession}
              className="border-indigo-300 text-indigo-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                setIsMuted(false);
              }}
              className="flex-1 h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-indigo-700 w-8">
              {isMuted ? 0 : volume}
            </span>
          </div>

          {/* Session Complete */}
          {progress === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-green-800">Session Complete!</h3>
              <p className="text-sm text-green-700">
                Great job completing this meditation session.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (activeSession) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <SessionPlayer session={activeSession} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/wellness">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wellness
            </Button>
          </Link>
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-4">
              <Image
                src="/images/logo.png"
                alt="Therapeia Logo"
                width={48}
                height={48}
                className="w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">Meditation</h1>
              <p className="text-gray-600">
                Find peace through guided meditation
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sessions Completed</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {completedSessions.length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Minutes</p>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-purple-600">5 days</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorite Category</p>
                  <p className="text-lg font-bold text-blue-600">
                    Sleep & Rest
                  </p>
                </div>
                <Moon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meditation Categories */}
        <div className="space-y-12">
          {meditationCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center mb-6">
                <div
                  className={`p-3 rounded-full ${category.color} text-white mr-4`}
                >
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.sessions.map((session) => (
                  <Card
                    key={session.id}
                    className={`transition-all hover:shadow-lg ${category.borderColor} ${category.bgColor}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle
                            className={`text-lg ${category.textColor} flex items-center`}
                          >
                            {session.title}
                            {completedSessions.includes(session.id) && (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                            )}
                          </CardTitle>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.duration} min
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Headphones className="w-4 h-4 mr-1" />
                              {backgroundSounds[session.background]}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            with {session.instructor}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {session.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-800 mb-2">
                          Benefits:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {session.benefits.map((benefit, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-gray-300 text-gray-600"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className={`w-full ${category.color} hover:${category.color}/90 text-white`}
                        onClick={() => startSession(session)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Session
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                Make Meditation a Daily Habit
              </h3>
              <p className="text-indigo-700 mb-4">
                Regular meditation practice can reduce stress, improve focus,
                and enhance overall well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/wellness">
                  <Button
                    variant="outline"
                    className="border-indigo-300 text-indigo-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Wellness Hub
                  </Button>
                </Link>
                <Link href="/therapy/chat">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Brain className="w-4 h-4 mr-2" />
                    Chat with AI Therapist
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;
