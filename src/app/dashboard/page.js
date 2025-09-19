"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Heart,
  Calendar,
  MessageCircle,
  TrendingUp,
  Target,
  Clock,
  Smile,
  Meh,
  Frown,
  Star,
  CheckCircle,
  ArrowRight,
  Activity,
  BookOpen,
  Users,
  Shield,
  Zap,
  Moon,
  Sun,
} from "lucide-react";

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [userName] = useState("Alex"); // This would come from auth context

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data - in real app, this would come from API
  const [dashboardData] = useState({
    currentMood: {
      level: 7,
      label: "Good",
      color: "text-green-600",
      icon: Smile,
    },
    weeklyMoodAverage: 6.8,
    totalSessions: 24,
    sessionsThisWeek: 3,
    currentStreak: 12,
    weeklyGoalProgress: 75,
    recentActivities: [
      {
        id: 1,
        type: "session",
        title: "Completed therapy session",
        time: "2 hours ago",
        icon: Brain,
        color: "text-teal-600",
      },
      {
        id: 2,
        type: "mood",
        title: "Logged mood: Happy",
        time: "5 hours ago",
        icon: Smile,
        color: "text-green-600",
      },
      {
        id: 3,
        type: "goal",
        title: "Achieved daily mindfulness goal",
        time: "1 day ago",
        icon: Target,
        color: "text-blue-600",
      },
      {
        id: 4,
        type: "journal",
        title: "Added journal entry",
        time: "2 days ago",
        icon: BookOpen,
        color: "text-purple-600",
      },
    ],
    upcomingAppointments: [
      {
        id: 1,
        title: "Weekly Check-in",
        time: "Tomorrow, 2:00 PM",
        type: "AI Session",
      },
      {
        id: 2,
        title: "Mindfulness Practice",
        time: "Friday, 10:00 AM",
        type: "Self-Care",
      },
    ],
    weeklyMoodData: [
      { day: "Mon", mood: 6 },
      { day: "Tue", mood: 7 },
      { day: "Wed", mood: 5 },
      { day: "Thu", mood: 8 },
      { day: "Fri", mood: 7 },
      { day: "Sat", mood: 6 },
      { day: "Sun", mood: 7 },
    ],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMoodColor = (moodLevel) => {
    if (moodLevel >= 8) return "bg-green-500";
    if (moodLevel >= 6) return "bg-blue-500";
    if (moodLevel >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Therapeia Logo"
                  width={48}
                  height={48}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-teal-700">
                  {getGreeting()}, {userName}!
                </h1>
                <p className="text-gray-600">
                  Welcome to your mental health dashboard
                </p>
              </div>
            </div>
            <div className="text-right">
              {isClient ? (
                <>
                  <p className="text-sm text-gray-500">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-lg font-medium text-teal-700">
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Loading...</p>
                  <p className="text-lg font-medium text-teal-700">--:--</p>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Mood</p>
                    <div className="flex items-center space-x-2">
                      <dashboardData.currentMood.icon
                        className={`w-5 h-5 ${dashboardData.currentMood.color}`}
                      />
                      <span className="text-xl font-bold text-gray-800">
                        {dashboardData.currentMood.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-teal-600">
                    {dashboardData.currentMood.level}/10
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sessions This Week</p>
                    <p className="text-xl font-bold text-gray-800">
                      {dashboardData.sessionsThisWeek}
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-xl font-bold text-gray-800">
                      {dashboardData.currentStreak} days
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Weekly Goal</p>
                    <p className="text-xl font-bold text-gray-800">
                      {dashboardData.weeklyGoalProgress}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/therapy/chat">
                    <Button className="w-full h-20 bg-teal-600 hover:bg-teal-700 flex flex-col items-center justify-center space-y-2">
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-sm">Start Chat</span>
                    </Button>
                  </Link>
                  <Link href="/wellness/mood">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-blue-200 text-blue-700 hover:bg-blue-50 flex flex-col items-center justify-center space-y-2"
                    >
                      <Heart className="w-6 h-6" />
                      <span className="text-sm">Log Mood</span>
                    </Button>
                  </Link>
                  <Link href="/wellness/meditation">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-purple-200 text-purple-700 hover:bg-purple-50 flex flex-col items-center justify-center space-y-2"
                    >
                      <Moon className="w-6 h-6" />
                      <span className="text-sm">Meditate</span>
                    </Button>
                  </Link>
                  <Link href="/wellness/journal">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-green-200 text-green-700 hover:bg-green-50 flex flex-col items-center justify-center space-y-2"
                    >
                      <BookOpen className="w-6 h-6" />
                      <span className="text-sm">Journal</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Mood Tracking Chart */}
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
                      {dashboardData.weeklyMoodAverage}/10
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {dashboardData.weeklyMoodData.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-500 mb-2">
                          {day.day}
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-20 flex items-end justify-center">
                            <div
                              className={`w-full ${getMoodColor(
                                day.mood
                              )} rounded-full transition-all duration-300`}
                              style={{ height: `${(day.mood / 10) * 100}%` }}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {day.mood}
                            </span>
                          </div>
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

            {/* Weekly Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Complete 4 therapy sessions
                      </span>
                      <span className="text-sm text-gray-500">3/4</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Daily mood logging
                      </span>
                      <span className="text-sm text-gray-500">6/7</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Mindfulness practice
                      </span>
                      <span className="text-sm text-gray-500">5/7</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Journal entries
                      </span>
                      <span className="text-sm text-gray-500">4/5</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData.upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">
                          {appointment.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {appointment.time}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/appointments">
                  <Button variant="outline" className="w-full mt-3">
                    View All Appointments
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3"
                  >
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mental Health Tip */}
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Star className="w-5 h-5" />
                  Today&apos;s Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-teal-800 mb-3">
                  &quot;Take a few deep breaths whenever you feel overwhelmed.
                  Deep breathing activates your body&apos;s relaxation response
                  and helps reduce stress.&quot;
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-teal-300 text-teal-700 hover:bg-teal-100"
                >
                  Try Breathing Exercise
                </Button>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Shield className="w-5 h-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-800 mb-3">
                  If you&apos;re experiencing a mental health crisis, don&apos;t
                  wait. Help is available 24/7.
                </p>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Crisis Hotline: 988
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Emergency Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
