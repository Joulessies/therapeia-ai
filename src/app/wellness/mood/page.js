"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ArrowLeft,
  Calendar,
  TrendingUp,
  Save,
  Smile,
  Meh,
  Frown,
  Angry,
  Laugh,
  Sun,
  Cloud,
  CloudRain,
  Zap,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const MoodTrackerPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const moods = [
    {
      id: 1,
      label: "Terrible",
      icon: Angry,
      color: "bg-red-500 hover:bg-red-600",
      textColor: "text-red-600",
    },
    {
      id: 2,
      label: "Bad",
      icon: Frown,
      color: "bg-orange-500 hover:bg-orange-600",
      textColor: "text-orange-600",
    },
    {
      id: 3,
      label: "Poor",
      icon: Frown,
      color: "bg-yellow-500 hover:bg-yellow-600",
      textColor: "text-yellow-600",
    },
    {
      id: 4,
      label: "Fair",
      icon: Meh,
      color: "bg-yellow-400 hover:bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      id: 5,
      label: "Okay",
      icon: Meh,
      color: "bg-blue-400 hover:bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      id: 6,
      label: "Good",
      icon: Smile,
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: 7,
      label: "Great",
      icon: Smile,
      color: "bg-green-400 hover:bg-green-500",
      textColor: "text-green-600",
    },
    {
      id: 8,
      label: "Excellent",
      icon: Smile,
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-green-600",
    },
    {
      id: 9,
      label: "Amazing",
      icon: Laugh,
      color: "bg-emerald-500 hover:bg-emerald-600",
      textColor: "text-emerald-600",
    },
    {
      id: 10,
      label: "Perfect",
      icon: Laugh,
      color: "bg-emerald-600 hover:bg-emerald-700",
      textColor: "text-emerald-600",
    },
  ];

  const emotions = [
    {
      id: "happy",
      label: "Happy",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    },
    {
      id: "sad",
      label: "Sad",
      color: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      id: "anxious",
      label: "Anxious",
      color: "bg-red-100 text-red-800 border-red-300",
    },
    {
      id: "excited",
      label: "Excited",
      color: "bg-orange-100 text-orange-800 border-orange-300",
    },
    {
      id: "calm",
      label: "Calm",
      color: "bg-green-100 text-green-800 border-green-300",
    },
    {
      id: "frustrated",
      label: "Frustrated",
      color: "bg-red-100 text-red-800 border-red-300",
    },
    {
      id: "grateful",
      label: "Grateful",
      color: "bg-purple-100 text-purple-800 border-purple-300",
    },
    {
      id: "lonely",
      label: "Lonely",
      color: "bg-gray-100 text-gray-800 border-gray-300",
    },
    {
      id: "confident",
      label: "Confident",
      color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    },
    {
      id: "overwhelmed",
      label: "Overwhelmed",
      color: "bg-red-100 text-red-800 border-red-300",
    },
    {
      id: "peaceful",
      label: "Peaceful",
      color: "bg-green-100 text-green-800 border-green-300",
    },
    {
      id: "angry",
      label: "Angry",
      color: "bg-red-100 text-red-800 border-red-300",
    },
  ];

  const recentEntries = [
    {
      date: "Today",
      mood: 7,
      emotions: ["happy", "grateful"],
      energy: 6,
      stress: 4,
    },
    {
      date: "Yesterday",
      mood: 6,
      emotions: ["calm", "peaceful"],
      energy: 5,
      stress: 3,
    },
    {
      date: "2 days ago",
      mood: 5,
      emotions: ["anxious", "overwhelmed"],
      energy: 4,
      stress: 7,
    },
    {
      date: "3 days ago",
      mood: 8,
      emotions: ["excited", "confident"],
      energy: 8,
      stress: 2,
    },
    {
      date: "4 days ago",
      mood: 6,
      emotions: ["happy", "calm"],
      energy: 6,
      stress: 4,
    },
  ];

  const toggleEmotion = (emotionId) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const saveMoodEntry = () => {
    if (!selectedMood) return;

    // In a real app, this would save to backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getMoodIcon = (moodLevel) => {
    const mood = moods.find((m) => m.id === moodLevel);
    return mood ? mood.icon : Meh;
  };

  const getMoodColor = (moodLevel) => {
    if (moodLevel >= 8) return "text-green-600";
    if (moodLevel >= 6) return "text-blue-600";
    if (moodLevel >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-pink-700">Mood Tracker</h1>
              <p className="text-gray-600">How are you feeling today?</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Mood Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Rate Your Mood
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Select the number that best represents how you're feeling
                  right now
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        selectedMood === mood.id
                          ? `${mood.color} text-white border-transparent shadow-lg scale-105`
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <mood.icon
                        className={`w-6 h-6 mb-1 ${
                          selectedMood === mood.id
                            ? "text-white"
                            : mood.textColor
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          selectedMood === mood.id
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {mood.id}
                      </span>
                      <span
                        className={`text-xs ${
                          selectedMood === mood.id
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emotions */}
            <Card>
              <CardHeader>
                <CardTitle>What emotions are you experiencing?</CardTitle>
                <p className="text-sm text-gray-600">Select all that apply</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.id}
                      onClick={() => toggleEmotion(emotion.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedEmotions.includes(emotion.id)
                          ? `${emotion.color} shadow-md`
                          : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {emotion.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Energy and Stress Levels */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Energy Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energyLevel}
                      onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Exhausted</span>
                      <span className="font-semibold text-yellow-600">
                        {energyLevel}/10
                      </span>
                      <span>Energetic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Stress Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={stressLevel}
                      onChange={(e) => setStressLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Relaxed</span>
                      <span className="font-semibold text-red-600">
                        {stressLevel}/10
                      </span>
                      <span>Stressed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes (Optional)</CardTitle>
                <p className="text-sm text-gray-600">
                  What&apos;s contributing to how you feel today?
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe what happened today, what you're thinking about, or anything else that might be affecting your mood..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button
                onClick={saveMoodEntry}
                disabled={!selectedMood}
                className={`px-8 py-3 text-lg ${
                  isSaved
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Saved Successfully!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Mood Entry
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Summary */}
            {selectedMood && (
              <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-700">
                    Today's Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {React.createElement(
                        moods.find((m) => m.id === selectedMood)?.icon || Meh,
                        {
                          className: "w-12 h-12 text-pink-600",
                        }
                      )}
                    </div>
                    <p className="text-2xl font-bold text-pink-700">
                      {selectedMood}/10
                    </p>
                    <p className="text-pink-600">
                      {moods.find((m) => m.id === selectedMood)?.label}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Energy:</span>
                      <span className="font-semibold">{energyLevel}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stress:</span>
                      <span className="font-semibold">{stressLevel}/10</span>
                    </div>
                    {selectedEmotions.length > 0 && (
                      <div>
                        <span>Emotions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedEmotions.map((emotionId) => {
                            const emotion = emotions.find(
                              (e) => e.id === emotionId
                            );
                            return (
                              <Badge
                                key={emotionId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {emotion?.label}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEntries.map((entry, index) => {
                    const MoodIcon = getMoodIcon(entry.mood);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <MoodIcon
                            className={`w-5 h-5 ${getMoodColor(entry.mood)}`}
                          />
                          <div>
                            <p className="text-sm font-medium">{entry.date}</p>
                            <p className="text-xs text-gray-500">
                              Energy: {entry.energy}, Stress: {entry.stress}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${getMoodColor(
                            entry.mood
                          )}`}
                        >
                          {entry.mood}/10
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-teal-800">
                  <p>📈 Your mood has improved by 15% this week</p>
                  <p>⚡ Energy levels are highest on weekends</p>
                  <p>😌 You feel most calm during morning hours</p>
                  <p>🎯 Consider meditation when stress is above 6</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrackerPage;
