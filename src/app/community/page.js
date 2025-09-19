"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MessageCircle,
  Calendar,
  Heart,
  Search,
  ArrowRight,
  Plus,
  Hash,
  Bell,
} from "lucide-react";

export default function CommunityPage() {
  const [post, setPost] = useState("");
  const groups = [
    {
      id: 1,
      name: "Anxiety Support",
      members: 1240,
      tag: "#anxiety",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Mindfulness & Meditation",
      members: 980,
      tag: "#mindfulness",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 3,
      name: "Daily Gratitude",
      members: 1560,
      tag: "#gratitude",
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  const discussions = [
    {
      id: 1,
      title: "What helps you when anxiety spikes?",
      replies: 42,
      group: "Anxiety Support",
      tag: "#anxiety",
    },
    {
      id: 2,
      title: "Share a win from today",
      replies: 65,
      group: "Daily Gratitude",
      tag: "#wins",
    },
    {
      id: 3,
      title: "Best time of day to meditate?",
      replies: 18,
      group: "Mindfulness & Meditation",
      tag: "#meditation",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Live Breathwork Session",
      date: "Fri 7:00 PM",
      attendees: 120,
    },
    {
      id: 2,
      title: "Mindfulness for Beginners",
      date: "Sun 10:00 AM",
      attendees: 85,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              <h1 className="text-3xl font-bold text-teal-700">Community</h1>
              <p className="text-gray-600">
                Connect, share, and grow with others
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Input placeholder="Search discussions" className="w-64" />
            <Button variant="outline" className="border-teal-300 text-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Create post & Discussions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-teal-600" />
                  Start a discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Share a question, insight, or supportive message..."
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 rounded bg-gray-100 border">
                      #support
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-100 border">
                      #wins
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-100 border">
                      #mindfulness
                    </span>
                  </div>
                  <Button
                    disabled={!post.trim()}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-teal-600" />
                  Trending discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {discussions.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 rounded-lg border hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">{d.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {d.tag}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {d.group} • {d.replies} replies
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Groups & Events */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {groups.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{g.name}</p>
                      <div className="text-xs text-gray-500">
                        {g.members.toLocaleString()} members
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded border text-xs ${g.color}`}
                      >
                        {g.tag}
                      </span>
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-teal-300 text-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" /> Create a Group
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Upcoming events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events.map((e) => (
                  <div
                    key={e.id}
                    className="p-3 rounded-lg border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{e.title}</p>
                      <p className="text-xs text-gray-500">
                        {e.date} • {e.attendees} attending
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-teal-300 text-teal-700"
                    >
                      Remind me
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
