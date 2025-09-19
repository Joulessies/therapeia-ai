"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Sparkles,
  Mic,
  MicOff,
  Tag,
  Save,
  Calendar,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";

const defaultPrompts = [
  "What emotion is strongest for you right now? Why?",
  "What is one small thing that went well today?",
  "If your best friend felt like you do, what would you tell them?",
  "What is one worry you can set aside until tomorrow?",
  "Name three things you can control right now.",
];

const tags = [
  {
    id: "gratitude",
    label: "Gratitude",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "anxiety",
    label: "Anxiety",
    color: "bg-red-100 text-red-800 border-red-300",
  },
  {
    id: "wins",
    label: "Wins",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "reflection",
    label: "Reflection",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "relationships",
    label: "Relationships",
    color: "bg-pink-100 text-pink-800 border-pink-300",
  },
];

export default function JournalPage() {
  const [prompt, setPrompt] = useState(defaultPrompts[0]);
  const [entry, setEntry] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Felt anxious but handled it",
      date: "Today, 9:40 PM",
      excerpt: "I noticed my heart racing before the meeting...",
      tags: ["anxiety", "reflection"],
    },
    {
      id: 2,
      title: "Three wins from this week",
      date: "Yesterday, 6:15 PM",
      excerpt: "I finished the feature, called my sister, and cooked dinner...",
      tags: ["gratitude", "wins"],
    },
  ]);

  const randomizePrompt = () => {
    const next =
      defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];
    setPrompt(next);
  };

  const toggleTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const simulateVoiceToText = () => {
    setIsRecording((r) => !r);
    if (!isRecording) {
      setTimeout(() => {
        setEntry(
          (e) =>
            (e ? e + " " : "") +
            "[Voice] I notice my breath slowing as I write this. I feel a bit calmer now."
        );
        setIsRecording(false);
      }, 1500);
    }
  };

  const saveEntry = async () => {
    if (!entry.trim()) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    const newEntry = {
      id: Date.now(),
      title: entry.split("\n")[0].slice(0, 50) || "Untitled entry",
      date: new Date().toLocaleString(),
      excerpt: entry.slice(0, 120) + (entry.length > 120 ? "..." : ""),
      tags: selectedTags,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setEntry("");
    setSelectedTags([]);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setIsSaving(false);
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

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
              <h1 className="text-3xl font-bold text-emerald-700">
                Therapeutic Journal
              </h1>
              <p className="text-gray-600">Reflect with gentle AI guidance</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Composer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  AI Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                  {prompt}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700"
                    onClick={randomizePrompt}
                  >
                    New Prompt
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI for help
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Write Your Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Start writing here..."
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="min-h-[180px]"
                />
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTag(t.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        selectedTags.includes(t.id)
                          ? t.color
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1 inline" />
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700"
                    onClick={simulateVoiceToText}
                  >
                    {isRecording ? (
                      <MicOff className="w-4 h-4 mr-2" />
                    ) : (
                      <Mic className="w-4 h-4 mr-2" />
                    )}
                    {isRecording ? "Stop" : "Voice to Text"}
                  </Button>
                  <Button
                    onClick={saveEntry}
                    disabled={!entry.trim() || isSaving}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Entry"}
                  </Button>
                  {saved && (
                    <span className="text-emerald-700 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" /> Saved
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entries List */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {entries.map((e) => (
                  <div
                    key={e.id}
                    className="p-3 rounded-lg border hover:bg-gray-50 transition flex items-start justify-between"
                  >
                    <div className="pr-3">
                      <p className="font-medium text-gray-800">{e.title}</p>
                      <p className="text-xs text-gray-500 mb-1">{e.date}</p>
                      <p className="text-sm text-gray-700">{e.excerpt}</p>
                      <div className="flex gap-1 mt-2">
                        {e.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {tags.find((x) => x.id === t)?.label || t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        title="Edit soon"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteEntry(e.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-700">
                  Why Journaling Helps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-sm text-emerald-800 space-y-1">
                  <li>Clarifies thoughts and emotions</li>
                  <li>Identifies patterns and triggers</li>
                  <li>Supports CBT techniques like cognitive reframing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
