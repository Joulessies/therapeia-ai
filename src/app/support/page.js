"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Mail, MessageCircle, Shield } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-teal-700 flex items-center gap-2">
          <Headphones className="w-6 h-6" /> Support
        </h1>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>How can we help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Get in touch or browse resources.</p>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Link href="/resources">
                  <MessageCircle className="w-4 h-4 mr-2" /> Browse resources
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700"
                asChild
              >
                <a href="mailto:support@therapeia.ai">
                  <Mail className="w-4 h-4 mr-2" /> Email support
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600"
                asChild
              >
                <Link href="/crisis">
                  <Shield className="w-4 h-4 mr-2" /> Crisis resources
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
