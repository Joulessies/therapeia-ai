"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Calendar, Edit3 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src="/images/logo.png"
              alt="Therapeia Logo"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-700">Your Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <User className="w-5 h-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Display name</label>
                <Input defaultValue="Therapeia User" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">user@example.com</span>
                  <Badge variant="secondary" className="ml-auto">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-wrap gap-2">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <Edit3 className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-700" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No recent activity yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
