"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-teal-700 flex items-center gap-2">
          <Settings className="w-6 h-6" /> App Settings
        </h1>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-700" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked />
              Email session summaries
            </label>
            <label className="flex items-center gap-3 text-sm">
              <Checkbox />
              Reminders for daily check-in
            </label>
            <Button className="mt-2 bg-teal-600 hover:bg-teal-700 text-white">
              Save
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-700" /> Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              Your data is stored securely. Configure privacy preferences below.
            </p>
            <label className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked />
              Anonymize session analytics
            </label>
            <Separator />
            <Button variant="outline" className="border-red-200 text-red-600">
              Delete my data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-teal-700" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Theme options coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
