"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Plus,
  ArrowLeft,
  CheckCircle,
  XCircle,
  PenSquare,
  Phone,
  Video,
  Brain,
  Bell,
} from "lucide-react";

const DEFAULT_APPOINTMENTS = [
  {
    id: 1,
    title: "Weekly Check-in",
    date: "2025-09-22",
    time: "14:00",
    type: "AI Session",
    mode: "Video",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Mindfulness Practice",
    date: "2025-09-19",
    time: "10:00",
    type: "Self-Care",
    mode: "Phone",
    status: "past",
  },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(DEFAULT_APPOINTMENTS);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("Video");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const past = appointments.filter((a) => a.status === "past");

  const schedule = async () => {
    if (!title || !date || !time) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setAppointments((prev) => [
      {
        id: Date.now(),
        title,
        date,
        time,
        type: "Custom",
        mode,
        status: "upcoming",
      },
      ...prev,
    ]);
    setTitle("");
    setDate("");
    setTime("");
    setMode("Video");
    setNotes("");
    setSaving(false);
  };

  const cancel = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const markDone = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "past" } : a))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
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
              <h1 className="text-3xl font-bold text-teal-700">Appointments</h1>
              <p className="text-gray-600">
                Schedule and manage your therapy sessions
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scheduler */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-teal-600" />
                  Schedule a Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Weekly Check-in"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Date</label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Time</label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Mode</label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={mode === "Video" ? "default" : "outline"}
                        onClick={() => setMode("Video")}
                        className={
                          mode === "Video"
                            ? "bg-teal-600 hover:bg-teal-700"
                            : "border-teal-300 text-teal-700"
                        }
                      >
                        <Video className="w-4 h-4 mr-2" /> Video
                      </Button>
                      <Button
                        type="button"
                        variant={mode === "Phone" ? "default" : "outline"}
                        onClick={() => setMode("Phone")}
                        className={
                          mode === "Phone"
                            ? "bg-teal-600 hover:bg-teal-700"
                            : "border-teal-300 text-teal-700"
                        }
                      >
                        <Phone className="w-4 h-4 mr-2" /> Phone
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Notes (optional)
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything you want to focus on?"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={schedule}
                    disabled={saving || !title || !date || !time}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {saving ? "Scheduling..." : "Schedule"}
                  </Button>
                  <p className="text-xs text-gray-500">
                    You can reschedule or cancel later.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-teal-600" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcoming.length === 0 && (
                  <p className="text-sm text-gray-500">No upcoming sessions.</p>
                )}
                {upcoming.map((a) => (
                  <div
                    key={a.id}
                    className="p-3 rounded-lg border hover:bg-gray-50 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{a.title}</p>
                        <p className="text-xs text-gray-500">
                          {a.date} • {a.time} • {a.mode}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-300 text-teal-700"
                        onClick={() => markDone(a.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Done
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancel(a.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Past */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Past Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {past.length === 0 && (
                  <p className="text-sm text-gray-500">No past sessions yet.</p>
                )}
                {past.map((a) => (
                  <div
                    key={a.id}
                    className="p-3 rounded-lg border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{a.title}</p>
                      <p className="text-xs text-gray-500">
                        {a.date} • {a.time} • {a.mode}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {a.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-sm text-teal-800 space-y-1">
                  <li>
                    Block out a quiet time for sessions to avoid interruptions.
                  </li>
                  <li>Use notes to set an intention before each session.</li>
                  <li>Consistency helps build momentum toward your goals.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
