"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  LinkIcon,
  FileText,
  Heart,
  Brain,
  Search,
  Download,
  ExternalLink,
  Shield,
  ArrowRight,
} from "lucide-react";

const guides = [
  {
    id: 1,
    title: "Getting Started with Therapeia",
    description:
      "A quick guide to begin your mental health journey with our tools.",
    length: "5 min read",
    tag: "Basics",
    href: "/guides/getting-started",
  },
  {
    id: 2,
    title: "Anxiety Toolkit: Practical Strategies",
    description: "Evidence-based techniques to manage anxiety day-to-day.",
    length: "8 min read",
    tag: "Anxiety",
    href: "/guides/anxiety-toolkit",
  },
  {
    id: 3,
    title: "CBT in Practice: Thought Challenging",
    description: "Learn how to reframe unhelpful thoughts using CBT methods.",
    length: "10 min read",
    tag: "CBT",
    href: "/guides/cbt-thought-challenging",
  },
];

const externalLinks = [
  {
    title: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support 24/7 in the U.S.",
    href: "https://988lifeline.org/",
    tag: "Crisis",
  },
  {
    title: "NIMH – Mental Health Information",
    description: "Trusted research-based info on mental health conditions.",
    href: "https://www.nimh.nih.gov/health",
    tag: "Education",
  },
  {
    title: "Mind (UK)",
    description:
      "Advice and support for anyone experiencing a mental health problem.",
    href: "https://www.mind.org.uk/",
    tag: "Support",
  },
];

const downloads = [
  {
    title: "Crisis Safety Plan (PDF)",
    description: "Personalized plan to stay safe during moments of crisis.",
    file: "/downloads/therapeia-safety-plan.pdf",
  },
  {
    title: "Daily Mood Journal (PDF)",
    description: "A printable tracker for mood, energy, and stress.",
    file: "/downloads/therapeia-mood-journal.pdf",
  },
];

export default function ResourcesPage() {
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
              <h1 className="text-3xl font-bold text-teal-700">Resources</h1>
              <p className="text-gray-600">
                Guides, tools, and links to support your well-being
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Input placeholder="Search resources" className="w-64" />
            <Button variant="outline" className="border-teal-300 text-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Guides */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Featured Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {guides.map((g) => (
                  <div
                    key={g.id}
                    className="p-4 rounded-lg border hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{g.title}</p>
                        <p className="text-sm text-gray-600">{g.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {g.tag}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {g.length}
                          </span>
                        </div>
                      </div>
                      <Link href={g.href}>
                        <Button
                          variant="outline"
                          className="border-teal-300 text-teal-700"
                        >
                          Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Downloadables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {downloads.map((d, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{d.title}</p>
                      <p className="text-sm text-gray-600">{d.description}</p>
                    </div>
                    <a href={d.file} download className="inline-flex">
                      <Button
                        variant="outline"
                        className="border-teal-300 text-teal-700"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Helpful Links */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-teal-600" />
                  Helpful Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {externalLinks.map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="p-3 rounded-lg border hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{l.title}</p>
                          <p className="text-sm text-gray-600">
                            {l.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {l.tag}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        Open link <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Shield className="w-5 h-5" />
                  Need Immediate Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-800 mb-3">
                  If you&apos;re in crisis, please visit the Crisis Support page
                  for immediate options.
                </p>
                <Link href="/crisis">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Go to Crisis Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
