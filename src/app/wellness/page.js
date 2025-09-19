"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Moon,
  BookOpen,
  Activity,
  Smile,
  Calendar,
  TrendingUp,
  Target,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Sun,
  CloudRain,
  Meh,
  Frown,
} from "lucide-react";

const WellnessPage = () => {
  const wellnessTools = [
    {
      id: "mood",
      title: "Mood Tracker",
      description:
        "Log your daily mood and emotions to identify patterns and triggers over time.",
      icon: Heart,
      href: "/wellness/mood",
      color: "bg-pink-600 hover:bg-pink-700",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      featured: true,
      stats: { streak: "7 days", entries: "28" },
      type: "Daily Tracking",
    },
    {
      id: "meditation",
      title: "Meditation",
      description:
        "Guided meditation sessions to reduce stress, improve focus, and find inner peace.",
      icon: Moon,
      href: "/wellness/meditation",
      color: "bg-indigo-600 hover:bg-indigo-700",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      stats: { sessions: "15", minutes: "240" },
      type: "Guided Practice",
    },
    {
      id: "journal",
      title: "Therapeutic Journal",
      description:
        "AI-guided journaling with personalized prompts to process thoughts and emotions.",
      icon: BookOpen,
      href: "/wellness/journal",
      color: "bg-emerald-600 hover:bg-emerald-700",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      stats: { entries: "12", words: "3.2k" },
      type: "Reflective Writing",
    },
  ];

  const todaysStats = {
    mood: { level: 7, label: "Good", icon: Smile, color: "text-green-600" },
    meditation: { minutes: 0, target: 15 },
    journal: { completed: false },
    streak: 7,
  };

  const weeklyMoodData = [
    { day: "Mon", mood: 6, icon: Smile },
    { day: "Tue", mood: 7, icon: Smile },
    { day: "Wed", mood: 5, icon: Meh },
    { day: "Thu", mood: 8, icon: Smile },
    { day: "Fri", mood: 7, icon: Smile },
    { day: "Sat", mood: 6, icon: Smile },
    { day: "Sun", mood: 7, icon: Smile },
  ];

  const getMoodColor = (moodLevel) => {
    if (moodLevel >= 8) return "bg-green-500";
    if (moodLevel >= 6) return "bg-blue-500";
    if (moodLevel >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
                Wellness Hub
              </h1>
              <p className="text-xl text-gray-600">
                Your mental wellness toolkit
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your mood, practice mindfulness, and reflect through
            journaling. Build healthy mental habits with our comprehensive
            wellness tools designed to support your emotional well-being.
          </p>
        </div>

        {/* Today's Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Sun className="w-6 h-6 text-yellow-500 mr-2" />
            Today&apos;s Wellness
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-pink-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Mood</p>
                    <div className="flex items-center space-x-2">
                      <todaysStats.mood.icon
                        className={`w-5 h-5 ${todaysStats.mood.color}`}
                      />
                      <span className="text-xl font-bold text-gray-800">
                        {todaysStats.mood.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-pink-600">
                    {todaysStats.mood.level}/10
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Meditation</p>
                    <p className="text-xl font-bold text-gray-800">
                      {todaysStats.meditation.minutes}/
                      {todaysStats.meditation.target} min
                    </p>
                  </div>
                  <Moon className="w-8 h-8 text-indigo-600" />
                </div>
                <Progress
                  value={
                    (todaysStats.meditation.minutes /
                      todaysStats.meditation.target) *
                    100
                  }
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Journal Entry</p>
                    <p className="text-xl font-bold text-gray-800">
                      {todaysStats.journal.completed ? "Complete" : "Pending"}
                    </p>
                  </div>
                  {todaysStats.journal.completed ? (
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  ) : (
                    <BookOpen className="w-8 h-8 text-emerald-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Wellness Streak</p>
                    <p className="text-xl font-bold text-gray-800">
                      {todaysStats.streak} days
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wellness Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Activity className="w-6 h-6 text-teal-600 mr-2" />
            Wellness Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {wellnessTools.map((tool) => (
              <Card
                key={tool.id}
                className={`transition-all hover:shadow-lg ${
                  tool.borderColor
                } ${tool.bgColor} ${
                  tool.featured ? "ring-2 ring-pink-200" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-full ${tool.color} text-white`}
                      >
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className={`text-xl ${tool.textColor}`}>
                          {tool.title}
                          {tool.featured && (
                            <Badge className="ml-2 bg-pink-600 text-white">
                              Popular
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tool.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(tool.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-semibold text-gray-800">{value}</p>
                          <p className="text-gray-500 capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={tool.href}>
                    <Button className={`w-full ${tool.color} text-white`}>
                      <Play className="w-4 h-4 mr-2" />
                      Open {tool.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Mood Trend */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Weekly Mood Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Average this week
                    </span>
                    <span className="text-lg font-semibold text-teal-600">
                      6.6/10
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyMoodData.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-500 mb-2">
                          {day.day}
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-16 flex items-end justify-center">
                            <div
                              className={`w-full ${getMoodColor(
                                day.mood
                              )} rounded-full transition-all duration-300`}
                              style={{ height: `${(day.mood / 10) * 100}%` }}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <day.icon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="text-xs font-medium text-gray-600 mt-1">
                          {day.mood}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor (1-3)</span>
                    <span>Fair (4-6)</span>
                    <span>Good (7-8)</span>
                    <span>Great (9-10)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/wellness/mood">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Log Today&apos;s Mood
                  </Button>
                </Link>
                <Link href="/wellness/meditation">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    5-Min Meditation
                  </Button>
                </Link>
                <Link href="/wellness/journal">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Write Journal Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  Today&apos;s Wellness Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  &quot;Practice the 5-4-3-2-1 grounding technique when feeling
                  overwhelmed: Notice 5 things you see, 4 you can touch, 3 you
                  hear, 2 you smell, and 1 you taste.&quot;
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-teal-300 text-teal-700 hover:bg-teal-50"
                >
                  Try This Technique
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Daily mood tracking</span>
                    <span className="text-sm text-gray-500">7/7</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Meditation sessions</span>
                    <span className="text-sm text-gray-500">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Journal entries</span>
                    <span className="text-sm text-gray-500">2/3</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessPage;
