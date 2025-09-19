"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Phone,
  MessageCircle,
  Globe,
  MapPin,
  Heart,
  Ambulance,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function CrisisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
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
              <h1 className="text-3xl font-bold text-red-700">
                Crisis Support
              </h1>
              <p className="text-gray-600">
                If you are in immediate danger, call your local emergency number
                now.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Immediate Help */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  Immediate Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" /> Call 988 (US)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Text/Chat 988
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <Ambulance className="w-4 h-4 mr-2" /> Local Emergency
                  </Button>
                </div>
                <p className="text-sm text-red-800">
                  If you cannot safely make a call, consider text/chat options
                  or seek help from someone nearby.
                </p>
              </CardContent>
            </Card>

            {/* Safety Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  Personal Safety Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Warning signs
                    </p>
                    <Textarea placeholder="Thoughts, situations, or feelings that signal risk..." />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Coping strategies
                    </p>
                    <Textarea placeholder="Things I can do to calm or distract myself..." />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      People who can help
                    </p>
                    <Textarea placeholder="Names and numbers of trusted contacts..." />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Professional resources
                    </p>
                    <Textarea placeholder="Therapist, clinic, crisis lines..." />
                  </div>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <CheckCircle className="w-4 h-4 mr-2" /> Save Safety Plan
                  (local)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hotlines & Resources */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  Hotlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border">
                  <p className="font-medium text-gray-800">United States</p>
                  <p className="text-sm text-gray-600">
                    988 Suicide & Crisis Lifeline (call/text/chat)
                  </p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="font-medium text-gray-800">
                    United Kingdom & ROI
                  </p>
                  <p className="text-sm text-gray-600">Samaritans: 116 123</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="font-medium text-gray-800">Canada</p>
                  <p className="text-sm text-gray-600">
                    Talk Suicide: 1-833-456-4566
                  </p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="font-medium text-gray-800">Australia</p>
                  <p className="text-sm text-gray-600">Lifeline: 13 11 14</p>
                </div>
                <p className="text-xs text-gray-500">
                  Numbers are provided for convenience; verify local options for
                  your region.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Heart className="w-5 h-5" />
                  After the Crisis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-sm text-teal-800 space-y-1">
                  <li>Schedule a follow-up with a professional</li>
                  <li>Tell a trusted person how you feel</li>
                  <li>Use grounding or breathing exercises</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
