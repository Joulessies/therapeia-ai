"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MessageCircle,
  Calendar,
  BookOpen,
  Target,
  Heart,
  Users,
  Clock,
  Star,
  ArrowRight,
  Play,
  Headphones,
  FileText,
  Activity,
} from "lucide-react";

const TherapyPage = () => {
  const therapyOptions = [
    {
      id: "chat",
      title: "AI Chat Therapy",
      description:
        "Start an immediate conversation with our AI therapist. Available 24/7 for support, guidance, and therapeutic techniques.",
      icon: MessageCircle,
      href: "/therapy/chat",
      color: "bg-teal-600 hover:bg-teal-700",
      textColor: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      featured: true,
      duration: "Available now",
      type: "Interactive",
    },
    {
      id: "session",
      title: "Guided Session",
      description:
        "Structured therapy sessions with specific goals and therapeutic frameworks. Perfect for focused work.",
      icon: Brain,
      href: "/therapy/session",
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      duration: "30-60 min",
      type: "Structured",
    },
    {
      id: "exercises",
      title: "Therapeutic Exercises",
      description:
        "Guided mindfulness, breathing, and cognitive exercises designed to improve mental wellbeing.",
      icon: Target,
      href: "/therapy/exercises",
      color: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      duration: "5-20 min",
      type: "Self-guided",
    },
    {
      id: "journal",
      title: "Therapeutic Journaling",
      description:
        "AI-guided journaling with prompts and insights to help you process thoughts and emotions.",
      icon: FileText,
      href: "/wellness/journal",
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      duration: "10-30 min",
      type: "Reflective",
    },
  ];

  const quickActions = [
    {
      title: "Crisis Support",
      description: "Immediate help if you're in crisis",
      icon: Heart,
      color: "bg-red-600 hover:bg-red-700",
      urgent: true,
    },
    {
      title: "Mood Check-in",
      description: "Quick mood assessment",
      icon: Activity,
      color: "bg-orange-600 hover:bg-orange-700",
      href: "/wellness/mood",
    },
    {
      title: "Breathing Exercise",
      description: "5-minute calming exercise",
      icon: Headphones,
      color: "bg-indigo-600 hover:bg-indigo-700",
    },
  ];

  const recentSessions = [
    {
      title: "Anxiety Management",
      date: "2 days ago",
      duration: "45 min",
      type: "Chat Session",
    },
    {
      title: "Sleep Hygiene",
      date: "1 week ago",
      duration: "30 min",
      type: "Guided Session",
    },
    {
      title: "Mindfulness Practice",
      date: "1 week ago",
      duration: "15 min",
      type: "Exercise",
    },
  ];

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
                Therapy Hub
              </h1>
              <p className="text-xl text-gray-600">
                Your personalized mental health support center
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from various therapeutic approaches designed to support your
            mental health journey. Our AI-powered tools are available 24/7 to
            provide guidance, support, and evidence-based interventions.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="w-6 h-6 text-teal-600 mr-2" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  action.urgent ? "border-red-200 bg-red-50" : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${action.color} text-white`}
                    >
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          action.urgent ? "text-red-800" : "text-gray-800"
                        }`}
                      >
                        {action.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          action.urgent ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Therapy Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Brain className="w-6 h-6 text-teal-600 mr-2" />
            Therapy Options
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {therapyOptions.map((option) => (
              <Card
                key={option.id}
                className={`transition-all hover:shadow-lg ${
                  option.borderColor
                } ${option.bgColor} ${
                  option.featured ? "ring-2 ring-teal-200" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-full ${option.color} text-white`}
                      >
                        <option.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className={`text-xl ${option.textColor}`}>
                          {option.title}
                          {option.featured && (
                            <Badge className="ml-2 bg-teal-600 text-white">
                              Most Popular
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {option.duration}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {option.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <Link href={option.href}>
                    <Button className={`w-full ${option.color} text-white`}>
                      <Play className="w-4 h-4 mr-2" />
                      Start {option.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Recent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {session.title}
                          </h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span>{session.date}</span>
                            <span>•</span>
                            <span>{session.duration}</span>
                            <span>•</span>
                            <span>{session.type}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/history">
                    <Button
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      View All Sessions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Focus */}
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Today's Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-teal-800 text-sm mb-4">
                  "Focus on managing stress through mindful breathing and
                  positive self-talk."
                </p>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Start Focus Session
                </Button>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Sessions completed
                  </span>
                  <span className="font-semibold text-teal-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total time</span>
                  <span className="font-semibold text-teal-600">2h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Streak</span>
                  <span className="font-semibold text-teal-600">12 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Need Support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 text-sm mb-4">
                  Remember, you're not alone in this journey. Professional help
                  is always available.
                </p>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    Find a Therapist
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    Crisis Resources
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

export default TherapyPage;
