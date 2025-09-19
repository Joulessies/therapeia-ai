import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src="/images/logo.png"
              alt="Therapeia Logo"
              width={96}
              height={96}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-teal-700">
            Welcome to Therapeia AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your personal mental health companion, powered by FREE AI
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/dashboard">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/therapy/chat">
              <Button
                variant="outline"
                className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 text-lg"
              >
                Start Chat Session
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-teal-900">
              AI Therapy Sessions
            </h3>
            <p className="text-muted-foreground">
              Get personalized therapy support available 24/7 with our advanced
              AI therapist
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-teal-900">
              Wellness Tracking
            </h3>
            <p className="text-muted-foreground">
              Monitor your mood, habits, and progress with comprehensive
              wellness tools
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-teal-900">
              Support Community
            </h3>
            <p className="text-muted-foreground">
              Connect with others on similar journeys in a safe, supportive
              environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
